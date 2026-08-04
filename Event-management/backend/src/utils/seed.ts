import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@university.edu' },
    update: {},
    create: {
      email: 'admin@university.edu',
      password: adminPassword,
      firstName: 'System',
      lastName: 'Admin',
      role: 'ADMIN',
    },
  });

  // Create organizer
  const organizerPassword = await bcrypt.hash('Organizer@123', 12);
  const organizer = await prisma.user.upsert({
    where: { email: 'organizer@university.edu' },
    update: {},
    create: {
      email: 'organizer@university.edu',
      password: organizerPassword,
      firstName: 'Jane',
      lastName: 'Organizer',
      role: 'ORGANIZER',
      studentId: 'ORG-001',
    },
  });

  // Create student
  const studentPassword = await bcrypt.hash('Student@123', 12);
  await prisma.user.upsert({
    where: { email: 'student@university.edu' },
    update: {},
    create: {
      email: 'student@university.edu',
      password: studentPassword,
      firstName: 'John',
      lastName: 'Student',
      role: 'STUDENT',
      studentId: 'STU-2024-001',
    },
  });

  // Create sample events
  const hackathon = await prisma.event.upsert({
    where: { id: 'seed-event-1' },
    update: {},
    create: {
      id: 'seed-event-1',
      title: 'Annual University Hackathon 2024',
      description: 'A 48-hour coding challenge where students collaborate to build innovative solutions to real-world problems. Open to all skill levels!',
      startDate: new Date('2024-03-15T09:00:00Z'),
      endDate: new Date('2024-03-17T09:00:00Z'),
      location: 'Engineering Building, Room 101',
      mode: 'HYBRID',
      onlineLink: 'https://meet.university.edu/hackathon2024',
      status: 'PUBLISHED',
      capacity: 200,
      tags: ['technology', 'coding', 'competition', 'innovation'],
      organizerId: organizer.id,
    },
  });

  await prisma.event.upsert({
    where: { id: 'seed-event-2' },
    update: {},
    create: {
      id: 'seed-event-2',
      title: 'Student Leadership Summit',
      description: 'An inspiring summit bringing together student leaders to discuss challenges, share experiences, and develop leadership skills for a better future.',
      startDate: new Date('2024-04-05T08:00:00Z'),
      endDate: new Date('2024-04-05T17:00:00Z'),
      location: 'Main Auditorium',
      mode: 'OFFLINE',
      status: 'PUBLISHED',
      capacity: 500,
      tags: ['leadership', 'networking', 'development'],
      organizerId: organizer.id,
    },
  });

  await prisma.event.upsert({
    where: { id: 'seed-event-3' },
    update: {},
    create: {
      id: 'seed-event-3',
      title: 'Virtual Career Fair 2024',
      description: 'Connect with top employers from various industries in this fully virtual career fair. Bring your resume and be ready for on-the-spot interviews!',
      startDate: new Date('2024-04-20T10:00:00Z'),
      endDate: new Date('2024-04-20T18:00:00Z'),
      mode: 'ONLINE',
      onlineLink: 'https://careerfair.university.edu/2024',
      status: 'PUBLISHED',
      capacity: 1000,
      tags: ['career', 'networking', 'employment', 'virtual'],
      organizerId: organizer.id,
    },
  });

  // Add schedules to hackathon
  await prisma.schedule.createMany({
    data: [
      {
        eventId: hackathon.id,
        title: 'Opening Ceremony & Team Formation',
        description: 'Welcome address, rules briefing, and team formation',
        startTime: new Date('2024-03-15T09:00:00Z'),
        endTime: new Date('2024-03-15T10:00:00Z'),
        location: 'Main Hall',
      },
      {
        eventId: hackathon.id,
        title: 'Hacking Begins',
        description: 'Start building your projects!',
        startTime: new Date('2024-03-15T10:00:00Z'),
        endTime: new Date('2024-03-17T08:00:00Z'),
        location: 'Engineering Building',
      },
      {
        eventId: hackathon.id,
        title: 'Project Submissions & Demos',
        description: 'Submit your project and demo to the judges',
        startTime: new Date('2024-03-17T08:00:00Z'),
        endTime: new Date('2024-03-17T09:00:00Z'),
        location: 'Main Hall',
      },
    ],
    skipDuplicates: true,
  });

  // Add logistics to hackathon
  await prisma.logistics.createMany({
    data: [
      { eventId: hackathon.id, item: 'Laptops', quantity: 50, status: 'confirmed', assignedTo: 'IT Department' },
      { eventId: hackathon.id, item: 'Extension cords', quantity: 30, status: 'confirmed' },
      { eventId: hackathon.id, item: 'Meals & Snacks', quantity: 200, status: 'pending', notes: 'Contact catering team' },
      { eventId: hackathon.id, item: 'T-shirts', quantity: 200, status: 'pending', notes: 'Sizes: S, M, L, XL' },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seeding completed!');
  console.log('📧 Admin: admin@university.edu / Admin@123');
  console.log('📧 Organizer: organizer@university.edu / Organizer@123');
  console.log('📧 Student: student@university.edu / Student@123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
