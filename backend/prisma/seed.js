const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs"); // Ensure bcryptjs is installed in backend
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. Clean up existing data (Order matters due to foreign keys)
  // Deleting in reverse order of dependencies
  await prisma.notification.deleteMany();
  await prisma.waitlist.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.sectionSchedule.deleteMany();
  await prisma.sectionCourse.deleteMany();
  await prisma.section.deleteMany();
  await prisma.deadline.deleteMany();
  await prisma.course.deleteMany();
  await prisma.term.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  console.log("🧹 Cleaned up existing data.");

  // 2. Create Roles
  const roles = ["Student", "Faculty", "Admin"];
  const roleMap = {};
  for (const name of roles) {
    const role = await prisma.role.create({ data: { name } });
    roleMap[name] = role.id;
  }
  console.log("✅ Roles created.");

  // Helper to hash password
  const password = await bcrypt.hash("Password@123", 10);

  // 3. Create Admin
  await prisma.user.create({
    data: {
      full_name: "Uday Kumar",
      email: "admin@smartenroll.com",
      password,
      roleId: roleMap["Admin"],
      sex: "Male",
      phone: "9876543210",
      address: "Bangalore, India",
    },
  });
  console.log("✅ Admin (Uday Kumar) created.");

  // 4. Create Faculty (Indian Names, CS/Math specialists)
  const facultyData = [
    { name: "Dr. Rajesh Sharma", email: "rajesh.sharma@smartenroll.com", sex: "Male" },
    { name: "Prof. Anjali Iyer", email: "anjali.iyer@smartenroll.com", sex: "Female" },
    { name: "Dr. Vikram Singh", email: "vikram.singh@smartenroll.com", sex: "Male" },
    { name: "Prof. Meera Reddy", email: "meera.reddy@smartenroll.com", sex: "Female" },
    { name: "Dr. Arjun Gupta", email: "arjun.gupta@smartenroll.com", sex: "Male" },
    { name: "Prof. Priya Nair", email: "priya.nair@smartenroll.com", sex: "Female" },
    { name: "Dr. Suresh Patel", email: "suresh.patel@smartenroll.com", sex: "Male" },
    { name: "Prof. Lakshmi Narayan", email: "lakshmi.narayan@smartenroll.com", sex: "Female" }
  ];

  const faculties = [];
  for (const f of facultyData) {
    const faculty = await prisma.user.create({
      data: {
        full_name: f.name,
        email: f.email,
        password,
        roleId: roleMap["Faculty"],
        sex: f.sex,
        phone: "912345678" + Math.floor(Math.random() * 9),
        address: "University Campus, India",
      },
    });
    faculties.push(faculty);
  }
  console.log(`✅ ${faculties.length} Faculty members created.`);

  // 5. Create Students (Indian Names)
  const studentNames = [
    "Aarav Patel", "Vihaan Rao", "Aditya Kumar", "Sai Krishna", "Ishaan Verma",
    "Vivaan Joshi", "Anaya Gupta", "Diya Mehta", "Saanvi Reddy", "Myra Singh",
    "Rohan Das", "Karthik Nair", "Arjun Malhotra", "Neha Kapoor", "Pooja Hegde",
    "Rahul Dravid", "Sneha Ullal", "Varun Dhawan", "Kriti Sanon", "Sidharth Malhotra",
    "Kiara Advani", "Ranbir Kapoor", "Alia Bhatt", "Deepika Padukone", "Ranveer Singh"
  ];

  const students = [];
  for (const name of studentNames) {
    const email = name.toLowerCase().replace(" ", ".") + "@student.smartenroll.com";
    const student = await prisma.user.create({
      data: {
        full_name: name,
        email,
        password,
        roleId: roleMap["Student"],
        sex: Math.random() > 0.5 ? "Male" : "Female",
        phone: "9" + Math.floor(100000000 + Math.random() * 900000000),
        address: "Hostel Block B, India",
      },
    });
    students.push(student);
  }
  console.log(`✅ ${students.length} Students created.`);

  // 6. Create Terms
  const spring2026 = await prisma.term.create({
    data: { year: 2026, semester: "Spring" },
  });
  const fall2026 = await prisma.term.create({
    data: { year: 2026, semester: "Fall" },
  });
  console.log("✅ Terms created (Spring 2026, Fall 2026).");

  // 7. Create Rooms
  const roomsCodes = ["A-101", "A-102", "B-201", "B-202", "LAB-1", "LAB-2"];
  const rooms = [];
  for (const code of roomsCodes) {
    rooms.push(await prisma.room.create({ data: { roomCode: code } }));
  }
  console.log("✅ Rooms created.");

  // 8. Create Courses (CS & Math)
  const coursesData = [
    { code: "CS101", title: "Intro to Programming", creditHours: 4, description: "Basics of C++ and Python." },
    { code: "CS201", title: "Data Structures", creditHours: 4, description: "Arrays, Linked Lists, Trees, Graphs." },
    { code: "CS301", title: "Algorithms", creditHours: 4, description: "Sorting, Searching, Dynamic Programming." },
    { code: "CS401", title: "Artificial Intelligence", creditHours: 3, description: "Intro to AI and ML." },
    { code: "CS402", title: "Web Development", creditHours: 3, description: "MERN Stack mastery." },
    { code: "DS101", title: "Database Systems", creditHours: 3, description: "SQL, NoSQL, and Normalization." },
    { code: "MATH101", title: "Calculus I", creditHours: 4, description: "Limits, Derivatives, and Integrals." },
    { code: "MATH201", title: "Linear Algebra", creditHours: 3, description: "Vectors, Matrices, and Spaces." },
    { code: "MATH301", title: "Discrete Mathematics", creditHours: 3, description: "Logic, Sets, and Graph Theory." },
  ];

  const courses = [];
  for (const c of coursesData) {
    courses.push(
      await prisma.course.create({
        data: { ...c, termId: spring2026.id },
      })
    );
  }
  console.log("✅ Courses created.");

  // 9. Create Sections, Assign Faculty, Create Schedules
  const sections = [];
  for (const course of courses) {
    const numSections = Math.random() > 0.3 ? 2 : 1; // Mostly 2 sections

    // Create Deadline for this course (OPEN for registration)
    // Open date: 30 days ago, Close date: 30 days from now
    const now = new Date();
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const oneMonthFuture = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const twoMonthsFuture = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);

    await prisma.deadline.create({
      data: {
        courseId: course.id,
        registrationOpen: oneMonthAgo,
        addDropStart: oneMonthAgo,
        addDropEnd: oneMonthFuture,
        registrationClose: oneMonthFuture,
        waitlistClose: twoMonthsFuture,
      }
    });

    for (let i = 0; i < numSections; i++) {
      const sectionCode = String.fromCharCode(65 + i); // A, B, C...
      const section = await prisma.section.create({
        data: {
          sectionCode,
          capacity: 60, // Standard class size
          termId: spring2026.id,
        },
      });
      sections.push(section);

      // Assign a random faculty
      const faculty = faculties[Math.floor(Math.random() * faculties.length)];

      const sectionCourse = await prisma.sectionCourse.create({
        data: {
          sectionId: section.id,
          courseId: course.id,
          facultyId: faculty.id,
        },
      });

      // Create Schedule
      const days = i % 2 === 0 ? "Monday/Wednesday" : "Tuesday/Thursday";
      const startHour = 9 + Math.floor(Math.random() * 6); // 9 AM to 3 PM
      const startTime = new Date();
      startTime.setHours(startHour, 0, 0, 0);

      const endTime = new Date(startTime);
      endTime.setHours(startHour + 1, 30, 0, 0); // 1.5 hours class

      const room = rooms[Math.floor(Math.random() * rooms.length)];

      await prisma.sectionSchedule.create({
        data: {
          dayOfWeek: days,
          startTime: startTime,
          endTime: endTime,
          roomId: room.id,
          sectionCourseId: sectionCourse.id,
          facultyId: faculty.id
        }
      });
    }
  }
  console.log("✅ Sections, Schedules, and Deadlines created.");

  // 10. Registrations & Waitlists
  // Enroll random students in random sections
  console.log("📝 Enrolling students...");
  for (const student of students) {
    // Each student registers for 3 random sections
    const randomSections = sections.sort(() => 0.5 - Math.random()).slice(0, 3);

    for (const section of randomSections) {
      // Check for existing registration (simple check via try/catch in loop or just create)
      // Since we wiped data, and randomized carefully, we assume uniqueness for this seed
      try {
        await prisma.registration.create({
          data: {
            studentId: student.id,
            sectionId: section.id,
          }
        });
      } catch (e) {
        // Ignore duplicate key errors in random logic
      }
    }

    // Send a Notification to each student
    await prisma.notification.create({
      data: {
        userId: student.id,
        message: "Welcome to the SmartEnroll System! Registration for Spring 2026 is now open.",
        read: false,
      }
    });
  }

  // 11. Create a Full Section & Waitlist
  // Pick the first section, lower its capacity to 5
  if (sections.length > 0) {
    const fullSection = sections[0];
    await prisma.section.update({
      where: { id: fullSection.id },
      data: { capacity: 0 } // Artificially full
    });

    // Add first 3 students to waitlist
    for (let i = 0; i < 3; i++) {
      try {
        await prisma.waitlist.create({
          data: {
            studentId: students[i].id,
            sectionId: fullSection.id
          }
        });
      } catch (e) {
        // ignore
      }
    }
    console.log(`⚠️ Created artificial waitlist for Section ${fullSection.id} (Capacity set to 0).`);
  }

  console.log("🎉 Database seeding COMPLETED successfully! All tables filled.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
