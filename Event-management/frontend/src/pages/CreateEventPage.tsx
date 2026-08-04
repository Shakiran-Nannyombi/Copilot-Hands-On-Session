import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { eventService } from '../services/event.service';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const createEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  mode: z.enum(['ONLINE', 'OFFLINE', 'HYBRID']),
  location: z.string().optional(),
  onlineLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  capacity: z.coerce.number().min(1).optional(),
  tags: z.string().optional(),
});

type CreateEventForm = z.infer<typeof createEventSchema>;

export default function CreateEventPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventForm>({
    resolver: zodResolver(createEventSchema),
    defaultValues: { mode: 'OFFLINE' },
  });

  const mode = watch('mode');

  const mutation = useMutation({
    mutationFn: (data: CreateEventForm) =>
      eventService.createEvent({
        ...data,
        tags: data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        onlineLink: data.onlineLink || undefined,
      }),
    onSuccess: (event) => {
      toast.success('Event created!');
      navigate(`/events/${event.id}`);
    },
    onError: (err: unknown) => {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to create event';
      toast.error(msg);
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h1>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
            <input {...register('title')} className="input-field" placeholder="Annual Tech Summit 2024" />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              {...register('description')}
              rows={4}
              className="input-field resize-none"
              placeholder="Describe your event..."
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time *</label>
              <input {...register('startDate')} type="datetime-local" className="input-field" />
              {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time *</label>
              <input {...register('endDate')} type="datetime-local" className="input-field" />
              {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Mode *</label>
            <Controller
              name="mode"
              control={control}
              render={({ field }) => (
                <div className="flex gap-3">
                  {(['OFFLINE', 'ONLINE', 'HYBRID'] as const).map((m) => (
                    <label key={m} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        {...field}
                        value={m}
                        checked={field.value === m}
                        className="text-primary-600"
                      />
                      <span className="text-sm">{m}</span>
                    </label>
                  ))}
                </div>
              )}
            />
          </div>

          {(mode === 'OFFLINE' || mode === 'HYBRID') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input {...register('location')} className="input-field" placeholder="Engineering Building, Room 101" />
            </div>
          )}

          {(mode === 'ONLINE' || mode === 'HYBRID') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Online Link</label>
              <input {...register('onlineLink')} type="url" className="input-field" placeholder="https://meet.example.com/event" />
              {errors.onlineLink && <p className="text-red-500 text-xs mt-1">{errors.onlineLink.message}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (optional)</label>
            <input {...register('capacity')} type="number" min={1} className="input-field" placeholder="200" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input {...register('tags')} className="input-field" placeholder="technology, coding, networking" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate(-1)} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting || mutation.isPending} className="btn-primary flex-1">
              {mutation.isPending ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
