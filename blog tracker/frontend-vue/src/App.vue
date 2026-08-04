<script setup>
import axios from 'axios'
import { computed, onMounted, reactive, ref } from 'vue'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
})

const loading = ref(false)
const blogs = ref([])
const errorMessage = ref('')

const filter = reactive({
  series: '',
  topic: '',
})

const form = reactive({
  title: '',
  url: '',
  series: '',
  topics: '',
  status: 'draft',
  deadline: '',
  notes: '',
})

const statuses = ['idea', 'draft', 'scheduled', 'posted']

const filteredBlogs = computed(() => {
  return blogs.value.filter((blog) => {
    const bySeries =
      !filter.series ||
      (blog.series || '').toLowerCase().includes(filter.series.toLowerCase())
    const byTopic =
      !filter.topic ||
      (blog.topics || []).some((topic) =>
        topic.toLowerCase().includes(filter.topic.toLowerCase()),
      )
    return bySeries && byTopic
  })
})

const toPayload = () => ({
  title: form.title.trim(),
  url: form.url.trim() || null,
  series: form.series.trim() || null,
  topics: form.topics
    .split(',')
    .map((topic) => topic.trim())
    .filter(Boolean),
  status: form.status,
  deadline: form.deadline || null,
  notes: form.notes.trim() || null,
})

const daysLeftLabel = (deadline) => {
  if (!deadline) return 'No deadline'
  const now = new Date()
  const target = new Date(`${deadline}T23:59:59`)
  const diffMs = target.getTime() - now.getTime()
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  if (days < 0) return `${Math.abs(days)} day(s) overdue`
  if (days === 0) return 'Due today'
  return `${days} day(s) left`
}

const resetForm = () => {
  Object.assign(form, {
    title: '',
    url: '',
    series: '',
    topics: '',
    status: 'draft',
    deadline: '',
    notes: '',
  })
}

const loadBlogs = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await api.get('/blogs')
    blogs.value = response.data
  } catch (error) {
    errorMessage.value =
      error.response?.data?.detail || 'Failed to load blogs from backend.'
  } finally {
    loading.value = false
  }
}

const createBlog = async () => {
  errorMessage.value = ''
  if (!form.title.trim()) {
    errorMessage.value = 'Blog title is required.'
    return
  }
  try {
    await api.post('/blogs', toPayload())
    resetForm()
    await loadBlogs()
  } catch (error) {
    errorMessage.value =
      error.response?.data?.detail || 'Failed to create blog entry.'
  }
}

const deleteBlog = async (id) => {
  errorMessage.value = ''
  try {
    await api.delete(`/blogs/${id}`)
    blogs.value = blogs.value.filter((blog) => blog.id !== id)
  } catch (error) {
    errorMessage.value =
      error.response?.data?.detail || 'Failed to delete blog entry.'
  }
}

const sendReminderToNotion = async (id) => {
  errorMessage.value = ''
  try {
    await api.post(`/blogs/${id}/notion-reminder`)
    await loadBlogs()
  } catch (error) {
    errorMessage.value =
      error.response?.data?.detail || 'Failed to create Notion reminder.'
  }
}

onMounted(loadBlogs)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-8">
    <header class="mb-8 rounded-2xl border border-blue-900/70 bg-ink/90 p-6 shadow-2xl shadow-black/40">
      <h1 class="mb-2 text-3xl font-bold text-cyan sm:text-4xl">Blog Tracker</h1>
      <p class="text-sm text-slate-300 sm:text-base">
        Track blog posts, topic series, and deadlines. Push reminders to your Notion dashboard.
      </p>
    </header>

    <section class="mb-8 grid gap-4 rounded-2xl border border-blue-900/50 bg-ink/80 p-6 md:grid-cols-2">
      <input v-model="filter.series" type="text" placeholder="Filter by series"
        class="rounded-lg border border-blue-800 bg-midnight px-3 py-2 text-slate-100 outline-none ring-cyan/50 transition focus:ring-2" />
      <input v-model="filter.topic" type="text" placeholder="Filter by topic"
        class="rounded-lg border border-blue-800 bg-midnight px-3 py-2 text-slate-100 outline-none ring-cyan/50 transition focus:ring-2" />
    </section>

    <section class="mb-8 rounded-2xl border border-blue-900/70 bg-ink/80 p-6">
      <h2 class="mb-4 text-xl font-semibold text-blue-300">Add New Blog</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <input v-model="form.title" type="text" placeholder="Blog title *"
          class="rounded-lg border border-blue-800 bg-midnight px-3 py-2 text-slate-100 outline-none ring-cyan/50 transition focus:ring-2" />
        <input v-model="form.url" type="url" placeholder="Published URL (optional)"
          class="rounded-lg border border-blue-800 bg-midnight px-3 py-2 text-slate-100 outline-none ring-cyan/50 transition focus:ring-2" />
        <input v-model="form.series" type="text" placeholder="Series name"
          class="rounded-lg border border-blue-800 bg-midnight px-3 py-2 text-slate-100 outline-none ring-cyan/50 transition focus:ring-2" />
        <input v-model="form.topics" type="text" placeholder="Topics (comma-separated)"
          class="rounded-lg border border-blue-800 bg-midnight px-3 py-2 text-slate-100 outline-none ring-cyan/50 transition focus:ring-2" />
        <select v-model="form.status"
          class="rounded-lg border border-blue-800 bg-midnight px-3 py-2 text-slate-100 outline-none ring-cyan/50 transition focus:ring-2">
          <option v-for="status in statuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
        <input v-model="form.deadline" type="date"
          class="rounded-lg border border-blue-800 bg-midnight px-3 py-2 text-slate-100 outline-none ring-cyan/50 transition focus:ring-2" />
      </div>
      <textarea v-model="form.notes" rows="3" placeholder="Notes"
        class="mt-4 w-full rounded-lg border border-blue-800 bg-midnight px-3 py-2 text-slate-100 outline-none ring-cyan/50 transition focus:ring-2"></textarea>
      <button @click="createBlog"
        class="mt-4 rounded-lg bg-sky px-5 py-2 font-semibold text-midnight transition hover:bg-cyan">
        Save Blog
      </button>
      <p v-if="errorMessage" class="mt-3 text-sm text-red-400">{{ errorMessage }}</p>
    </section>

    <section class="rounded-2xl border border-blue-900/70 bg-ink/80 p-6">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-blue-300">Your Blog Pipeline</h2>
        <span class="text-sm text-slate-300">{{ filteredBlogs.length }} entries</span>
      </div>
      <p v-if="loading" class="text-slate-300">Loading...</p>
      <p v-else-if="!filteredBlogs.length" class="text-slate-300">No blogs found yet.</p>
      <div v-else class="grid gap-4">
        <article v-for="blog in filteredBlogs" :key="blog.id"
          class="rounded-xl border border-blue-900/60 bg-midnight/80 p-4">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 class="text-lg font-semibold text-cyan">{{ blog.title }}</h3>
              <p class="text-sm text-slate-300">Series: {{ blog.series || 'Not set' }}</p>
              <p class="text-sm text-slate-300">Status: {{ blog.status }}</p>
              <p class="text-sm text-slate-300">Deadline: {{ blog.deadline || 'Not set' }} · {{ daysLeftLabel(blog.deadline) }}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button @click="sendReminderToNotion(blog.id)"
                class="rounded-md bg-blue-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
                Send to Notion
              </button>
              <button @click="deleteBlog(blog.id)"
                class="rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700">
                Delete
              </button>
            </div>
          </div>
          <div class="mt-3 flex flex-wrap gap-2">
            <span v-for="topic in blog.topics" :key="topic"
              class="rounded-full bg-blue-900/80 px-3 py-1 text-xs text-blue-100">
              {{ topic }}
            </span>
          </div>
          <a v-if="blog.url" :href="blog.url" target="_blank" rel="noreferrer"
            class="mt-3 inline-block text-sm text-sky hover:text-cyan">
            Open blog link
          </a>
          <p v-if="blog.notion_page_id" class="mt-2 text-xs text-blue-300">
            Notion reminder linked: {{ blog.notion_page_id }}
          </p>
        </article>
      </div>
    </section>
  </main>
</template>
