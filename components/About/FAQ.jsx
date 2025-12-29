"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Search,
  BookOpen,
  Users,
  DollarSign,
  Clock,
  Globe,
  HelpCircle,
  Filter,
  X,
} from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Define categories with icons and colors
  const categories = [
    {
      id: "all",
      name: "All Questions",
      icon: HelpCircle,
      color: "from-[#023f4d] to-[#035a6d]",
    },
    {
      id: "group",
      name: "Group Classes",
      icon: Users,
      color: "from-[#023f4d] to-teal-600",
    },
    {
      id: "individual",
      name: "One-to-One Classes",
      icon: BookOpen,
      color: "from-[#023f4d] to-cyan-600",
    },
    {
      id: "payment",
      name: "Payment & Pricing",
      icon: DollarSign,
      color: "from-[#023f4d] to-emerald-600",
    },
    {
      id: "course",
      name: "Course Structure",
      icon: Clock,
      color: "from-[#023f4d] to-teal-700",
    },
    {
      id: "language",
      name: "Language & Dialects",
      icon: Globe,
      color: "from-[#023f4d] to-cyan-700",
    },
  ];

  const faqData = [
    // Q1
    {
      question: "How do group classes work?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>Our group classes are fully interactive live sessions designed to help students speak Arabic confidently from day one.</p>
          <p><b>Here’s how they work:</b></p>

          <ol>
            <li>
              <b>Small Groups (4–6 students)</b><br/>
              We keep groups small so every student gets speaking time, correction, and individual feedback.
            </li>
            <li>
              <b>Fixed Weekly Schedule</b><br/>
              Group classes run at fixed days and times every week, so students join a consistent routine and improve steadily.
            </li>
            <li>
              <b>All Lessons Are Recorded</b><br/>
              Even though the schedule is fixed, every single session is recorded, so if a student misses a class, they can catch up easily.
            </li>
            <li>
              <b>Live Interactive Lessons – Twice a Week</b><br/>
              Each level has 48 live sessions, held twice weekly (1.5–2 hours), taught by professional Egyptian teachers specialized in teaching non-native speakers.
            </li>
            <li>
              <b>Different Materials for Egyptian Arabic vs. MSA</b>
              <ul>
                <li>
                  <b>Egyptian Arabic (ECA):</b> Arabic script + Franco-Arabic + English translation — perfect for learners who can’t read Arabic yet.
                </li>
                <li>
                  <b>Modern Standard Arabic (MSA):</b> Arabic script + English translation only (no Franco). MSA conversation students must be able to read Arabic before joining.
                </li>
              </ul>
            </li>
            <li>
              <b>Full Lesson Materials</b><br/>
              Every lesson includes: clear explanations, listening audio tracks, speaking tasks, and homework activities.
            </li>
            <li>
              <b>Interactive, Supportive Environment</b><br/>
              Classes are fun, friendly, and highly interactive — students speak with the teacher and classmates throughout the session.
            </li>
            <li>
              <b>Free Placement Test</b><br/>
              Every student takes a free placement test before joining to ensure they start at the correct level.
            </li>
          </ol>
        </div>
      `,
    },

    // Q2
    {
      question: "How can I catch up if I've missed a group class?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>After every session, the <b>recorded class</b> will be uploaded, so you’ll always have access to it as a reference — whether you attended the session or not.</p>
          <p>Additionally, all the materials used during the class, including videos, files, and presentations, will be provided to you. This ensures you have everything you need to review, revise, and stay on track with your learning.</p>
        </div>
      `,
    },

    // Q3
    {
      question: "How do one-to-one classes work?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>Our one-to-one classes are personalized, flexible sessions designed to help each student progress quickly and confidently.</p>
          <p><b>Here’s how they work:</b></p>

          <ul>
            <li>
              <b>Fully Customized Lessons</b><br/>
              Every class is tailored to the student’s exact level, goals, and pace — whether they want to focus on speaking, listening, grammar, pronunciation, or specific real-life situations.
            </li>
            <li>
              <b>Flexible Scheduling</b><br/>
              Students can choose the days and times that suit them. Unlike group classes, one-to-one lessons are not fixed — they’re booked based on the student’s availability.
            </li>
            <li>
              <b>Live Private Sessions</b><br/>
              The teacher works closely with the student throughout the session, giving direct correction, personalized feedback, and continuous speaking practice.
            </li>
            <li>
              <b>Full Access to Lesson Materials</b><br/>
              Students receive all lesson materials after each class:
              <ul>
                <li><b>Egyptian Arabic:</b> Arabic script + Franco-Arabic + English</li>
                <li><b>Modern Standard Arabic (MSA):</b> Arabic script + English only (no Franco). Students must be able to read Arabic to join MSA conversation courses.</li>
              </ul>
            </li>
            <li>
              <b>Recorded Lessons Available</b><br/>
              All private sessions can be recorded upon request, so the student can review the lesson anytime.
            </li>
            <li>
              <b>Faster Progress</b><br/>
              Since the teacher focuses on one learner only, students typically advance faster, gain confidence, and improve speaking fluency more quickly than in group settings.
            </li>
            <li>
              <b>Suitable for All Levels</b><br/>
              We offer a fully structured curriculum from absolute beginners to advanced learners. Each level builds on the previous one with clear progress and real-life language.
            </li>
          </ul>
        </div>
      `,
    },

    // Q4
    {
      question: "How does the subscription for one-to-one classes work?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>Our one-to-one subscription is flexible and designed to fit each student’s schedule and learning goals.</p>
          <p><b>Here’s how it works:</b></p>

          <ol>
            <li>
              <b>Choose Your Package</b><br/>
              Students select the number of private lessons they want — whether it’s a small package or a full monthly plan.
            </li>
            <li>
              <b>Flexible Scheduling</b><br/>
              One-to-one lessons don’t have fixed weekly times. Students book sessions based on their availability and the teacher’s schedule.
            </li>
            <li>
              <b>Personalized Learning</b><br/>
              Each session is customized to the student’s level and goals — speaking, listening, grammar, pronunciation, real-life practice, and more.
            </li>
            <li>
              <b>Recorded Sessions (Optional)</b><br/>
              Lessons can be recorded upon request so students can review them anytime.
            </li>
          </ol>
        </div>
      `,
    },

    // Q5
    {
      question: "Which Arabic dialects do you teach?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>We currently offer courses in <b>Modern Standard Arabic (MSA)</b> and <b>Egyptian Colloquial Arabic (ECA)</b>, depending on your learning goals.</p>
          <p>In the near future, we plan to introduce courses in other Arabic dialects to further expand your learning opportunities.</p>
        </div>
      `,
    },

    // Q6
    {
      question: "Should I learn Modern Standard Arabic or Egyptian Dialect?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>This is a common question — and the best choice depends on your goals.</p>

          <h4><b>Modern Standard Arabic (MSA)</b></h4>
          <ul>
            <li><b>Usage:</b> Used in books, articles, formal speeches, and religious texts.</li>
            <li><b>Benefits:</b> Helps with formal communication and reading Arabic across the region.</li>
            <li><b>Difficulty:</b> Often more challenging at the beginning due to grammar and syntax.</li>
          </ul>

          <h4><b>Egyptian Dialect (ECA)</b></h4>
          <ul>
            <li><b>Usage:</b> Widely understood due to Egyptian media, films, music, and TV.</li>
            <li><b>Benefits:</b> Great for daily conversation, culture, and real-life interaction in Egypt.</li>
            <li><b>Difficulty:</b> Usually easier to start, but differs from MSA in grammar, vocabulary, and pronunciation.</li>
          </ul>

          <h4><b>My advice</b></h4>
          <ul>
            <li>If you want reading/writing and formal content: choose <b>MSA</b>.</li>
            <li>If you want daily conversation and cultural immersion: choose <b>Egyptian Dialect</b>.</li>
          </ul>
        </div>
      `,
    },

    // Q7
    {
      question: "Can I ask for a refund?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>We don’t offer refunds after payment, but we make sure you feel confident and comfortable with your choice.</p>
          <p>That’s why we provide a <b>free trial session</b> before you join — so you can confirm the course, level, and teacher are the perfect fit.</p>
          <p>If you later feel you’d like something different, we offer flexible options:</p>
          <ul>
            <li>You can switch to another course</li>
            <li>Or transfer your subscription to someone else at no extra cost</li>
          </ul>
          <p>Your learning experience matters to us, and we’ll always help you choose the option that works best for you.</p>
        </div>
      `,
    },

    // Q8
    {
      question: "What is the duration and structure of the program?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <h4><b>One-to-One Classes</b></h4>
          <p>Each private session lasts <b>1 hour</b>. The session length or frequency can be adjusted based on your needs.</p>

          <h4><b>Group Classes</b></h4>
          <p>Each group session lasts between <b>1.5 to 2 hours</b>. Classes run on fixed days every week, and all sessions are recorded so you can review or catch up anytime.</p>

          <h4><b>Course Duration</b></h4>
          <p>Each level typically takes <b>6–7 months</b> to complete. This can be shortened if you study more frequently or choose a more intensive plan.</p>

          <p>We value your time and commitment, and we work to provide a learning experience that fits your schedule and supports your progress.</p>
        </div>
      `,
    },

    // Q9
    {
      question: "Can you personalize the courses to meet our specific needs?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p><b>Absolutely!</b> Our programs are flexible and tailored to your goals.</p>

          <h4><b>Group Classes</b></h4>
          <p>We follow a structured curriculum covering speaking, listening, reading, and writing. Even though the content is planned, it supports a wide range of goals — conversation, grammar, milestones, and more.</p>

          <h4><b>Private Lessons</b></h4>
          <p>For a fully personalized experience, we create a custom learning plan based on your exact goals. Sessions can focus on daily conversation, work-related Arabic, pronunciation, grammar, or specific challenges.</p>

          <p>Whether you choose group or private classes, we’re here to help you reach your goals faster and more confidently.</p>
        </div>
      `,
    },

    // Q10
    {
      question: "What resources and materials will be provided to students?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>We offer unique and accredited curricula for teaching the Egyptian dialect, designed to help students learn the modern, natural language used daily in Egypt.</p>

          <h4><b>What makes our curriculum stand out?</b></h4>
          <ul>
            <li><b>Exclusive Materials:</b> Listening scripts, PDF files, and videos inspired by films, TV shows, and social media.</li>
            <li><b>Carefully Designed Curriculum:</b> Each level includes <b>200+ audio recordings</b> focusing on listening and speaking.</li>
            <li><b>Interactive Practice:</b> Fun, engaging exercises to improve speaking and listening effectively.</li>
            <li><b>Cairene Dialect Focus:</b> Centered on the language spoken by Cairo’s residents for smooth daily communication.</li>
            <li><b>Living Language Usage:</b> Based on the modern language used in Egyptian society today.</li>
          </ul>

          <h4><b>Teaching Methods</b></h4>
          <ul>
            <li><b>Interactive Activities</b> to motivate speaking and listening</li>
            <li><b>Multimedia Resources</b> including recordings, videos, and authentic texts</li>
            <li><b>Targeted Exercises</b> to ensure fast, effective results</li>
          </ul>

          <p>We provide a fun and comprehensive learning experience that prepares you to use Arabic with ease and confidence in daily life.</p>
        </div>
      `,
    },

    // Q11
    {
      question: "How many students are there in a group class?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>Each group class typically includes a <b>minimum of 3 students</b> and a <b>maximum of 6 students</b>.</p>
          <p>This keeps the experience highly interactive and ensures everyone has opportunities to practice speaking and receive attention from the teacher.</p>
        </div>
      `,
    },

    // Q11.2 (materials fee)
    {
      question:
        "Are the materials used in the course included in the subscription, or is there an additional fee?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p><b>All course materials are fully included</b> in the subscription.</p>
          <p>There are no additional fees for learning materials, including audio recordings, PDF files, videos, and interactive activities.</p>
        </div>
      `,
    },

    // Q12
    {
      question: "Who teaches at the academy, and are the teachers native Arabic speakers?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>All our teachers are highly qualified <b>native Arabic speakers</b> with professional certification and extensive experience teaching Arabic as a foreign language.</p>
          <p>For Egyptian dialect courses, all teachers are <b>Egyptian natives</b>, so students learn authentic language with real cultural context.</p>
          <p>Our instructors focus on practical, real-life usage and tailor the experience to each student’s goals.</p>
        </div>
      `,
    },

    // Q12.2
    {
      question: "Are the lessons live or pre-recorded?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>Lessons are primarily <b>live and fully interactive</b>, so you can engage with your teacher and classmates in real time.</p>
          <p>Additionally, all live sessions are <b>recorded and made available</b> to students for review or catching up.</p>
        </div>
      `,
    },

    // Q13
    {
      question: "Can I enroll in the course and watch the recordings as if it were a pre-recorded course?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p><b>Yes, you can.</b> All live lessons are recorded and available for you to access anytime.</p>
          <p>This allows you to learn at your own pace while still benefiting from the structured curriculum and materials.</p>
          <p>However, we encourage attending live sessions whenever possible for real-time interaction and personalized support.</p>
        </div>
      `,
    },

    // Q14
    {
      question: "Does the course cover cultural aspects of Egyptian life?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p><b>Absolutely!</b> Our courses go beyond language learning to help you understand Egyptian culture and daily life.</p>
          <p>You’ll learn practical expressions, common traditions, cultural norms, idioms, and references from Egyptian movies, TV shows, and social media — making the experience authentic and engaging.</p>
        </div>
      `,
    },

    // Q15
    {
      question:
        "Can this course help me prepare for travel or work in Egypt, and communicate with my partner’s family or my own relatives?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p><b>Absolutely!</b> Our courses are designed to help you use real, everyday Egyptian Arabic confidently — for travel, work, and family situations.</p>
          <p>You’ll learn:</p>
          <ul>
            <li>Practical phrases used in daily life</li>
            <li>Real conversations Egyptians use at home, work, and social situations</li>
            <li>How to speak naturally with family members and your partner’s relatives</li>
            <li>Cultural tips that help you fit in and feel comfortable</li>
          </ul>
          <p>By the end of the course, you’ll handle real conversations confidently — from family gatherings to taxis, shopping, and everyday interactions in Egypt.</p>
        </div>
      `,
    },

    // Q16
    {
      question: "Are there any homework or post-class activities?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>Yes. Every lesson includes homework and post-class activities to reinforce learning and improve speaking, listening, reading, and writing.</p>
          <p>Examples include:</p>
          <ul>
            <li><b>Listening Practice:</b> Audio work to improve comprehension</li>
            <li><b>Speaking Exercises:</b> Role plays and phrase practice to boost fluency</li>
            <li><b>Vocabulary & Grammar Tasks:</b> Targeted practice to solidify understanding</li>
            <li><b>Interactive Activities:</b> Fun tasks that connect lessons to real life</li>
          </ul>
          <p>Our goal is steady progress while keeping the experience enjoyable and productive.</p>
        </div>
      `,
    },

    // Q16.2 (switch later)
    {
      question: "Can I switch from group classes to private lessons later?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p><b>Yes, absolutely!</b> You can transition from group classes to private lessons at any point during the course.</p>
          <p>Our team will ensure a smooth transition and help design a tailored learning plan aligned with your objectives.</p>
        </div>
      `,
    },

    // Q17
    {
      question: "How long will it take me to become fluent?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>The time to become fluent depends on your starting level, practice time, and exposure outside class.</p>
          <p>In our structured program:</p>
          <ul>
            <li>Each level typically takes <b>6–7 months</b> with two sessions per week.</li>
            <li>After completing <b>Level 1 and Level 2</b>, most students reach a strong conversational level for everyday situations.</li>
          </ul>
          <p>For full fluency, we recommend consistent practice, participation in speaking activities, and immersion through Egyptian media and real-life usage.</p>
        </div>
      `,
    },

    // Q18
    {
      question: "What payment methods do you accept?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>We offer secure and convenient payment methods, including:</p>
          <ul>
            <li><b>Credit/Debit Cards:</b> All major cards accepted</li>
            <li><b>PayPal:</b> For international payments</li>
            <li><b>Bank Transfers:</b> Available upon request for certain regions</li>
            <li><b>Digital Wallets:</b> Depending on availability in your region</li>
            <li><b>Money Transfer Apps:</b> Western Union, Ria, MoneyGram</li>
          </ul>
          <p>If you prefer a different method, contact us and we’ll do our best to accommodate you.</p>
        </div>
      `,
    },

    // Q19
    {
      question: "How do I contact the academy if I have questions?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>You can reach us through multiple channels:</p>
          <ul>
            <li><b>Email:</b> Send us an email at [your email address]</li>
            <li><b>Phone/WhatsApp:</b> Call or message us at [your phone/WhatsApp number]</li>
            <li><b>Social Media:</b> Connect with us on [Instagram, Facebook, etc.]</li>
            <li><b>Contact Form:</b> Use the form on our website and we’ll get back to you</li>
          </ul>
          <p>Our support team is always ready to assist you.</p>
        </div>
      `,
    },

    // Q20
    {
      question: "Is there support available if I need help with the materials or classes?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p><b>Absolutely!</b> Our support team and teachers are here to help.</p>
          <ul>
            <li><b>Teacher Assistance:</b> Ask questions and get clarification during and after class</li>
            <li><b>Student Support Team:</b> Email/phone/WhatsApp support for materials access, assignments, or technical issues</li>
            <li><b>Interactive Resources:</b> Guides, FAQs, and extra learning resources</li>
          </ul>
          <p>We’re committed to a smooth and effective learning experience.</p>
        </div>
      `,
    },

    // Q21
    {
      question: "What is the cost of the courses?",
      answer: `
        <div class="elementskit-card-body ekit-accordion--content">
          <p>The cost varies depending on the program (group or private) and course duration.</p>
          <p>For detailed pricing, please contact us and we’ll provide a tailored quote based on your preferences and learning needs.</p>
          <p>We also offer:</p>
          <ul>
            <li><b>Flexible payment options:</b> Including installment plans</li>
            <li><b>Discounts:</b> For enrolling in multiple levels or referring a friend</li>
          </ul>
          <p>Our courses are competitively priced to deliver high-quality education and strong value.</p>
        </div>
      `,
    },
  ];

  // Categorize FAQ items
  const categorizedFAQ = faqData.map((item, index) => {
    let category = "general";
    const question = item.question.toLowerCase();

    if (question.includes("group class") || question.includes("group classes"))
      category = "group";
    else if (question.includes("one-to-one") || question.includes("private"))
      category = "individual";
    else if (
      question.includes("cost") ||
      question.includes("payment") ||
      question.includes("refund") ||
      question.includes("pricing")
    )
      category = "payment";
    else if (
      question.includes("duration") ||
      question.includes("structure") ||
      question.includes("homework") ||
      question.includes("program")
    )
      category = "course";
    else if (
      question.includes("dialect") ||
      question.includes("arabic") ||
      question.includes("egyptian") ||
      question.includes("egypt")
    )
      category = "language";

    return { ...item, category, originalIndex: index };
  });

  // Filter FAQ based on search and category
  const filteredFAQ = categorizedFAQ.filter((item) => {
    const matchesSearch = item.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Count items per category
  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return categorizedFAQ.length;
    return categorizedFAQ.filter((item) => item.category === categoryId).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#023f4d] to-teal-600 rounded-3xl mb-6 shadow-lg">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#023f4d] mb-6 leading-tight">
            Frequently Asked
            <span className="block bg-gradient-to-r from-[#023f4d] to-teal-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our Arabic language courses
            and programs.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                <Search className="w-5 h-5 text-[#023f4d]" />
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#023f4d] focus:border-transparent transition-all duration-300 shadow-sm"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center justify-center gap-2 px-6 py-4 bg-[#023f4d] text-white rounded-xl hover:bg-[#035a6d] transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filter Categories
            </button>
          </div>

          {/* Category Filters - Desktop */}
          <div className="hidden md:flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              const count = getCategoryCount(category.id);

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                      : "bg-white text-gray-600 hover:text-[#023f4d] hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                  <span
                    className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                      isActive ? "bg-white/20" : "bg-gray-100"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Category Filters - Mobile */}
          {isFilterOpen && (
            <div
              className="md:hidden fixed inset-0 z-50 bg-black/50"
              onClick={() => setIsFilterOpen(false)}
            >
              <div
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[#023f4d]">
                    Filter by Category
                  </h3>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = selectedCategory === category.id;
                    const count = getCategoryCount(category.id);

                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? `bg-gradient-to-r ${category.color} text-white`
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="flex-1 text-left">
                          {category.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            isActive ? "bg-white/20" : "bg-gray-200"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12 items-start">
          {filteredFAQ.map((item, index) => {
            const categoryInfo = categories.find(
              (cat) =>
                cat.id === item.category ||
                (item.category === "general" && cat.id === "all")
            );
            const Icon = categoryInfo?.icon || HelpCircle;

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg ${
                  openIndex === index
                    ? "shadow-xl ring-2 ring-[#023f4d]/20"
                    : "shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left focus:outline-none group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`p-1.5 rounded-lg bg-gradient-to-r ${
                            categoryInfo?.color || "from-gray-400 to-gray-500"
                          } bg-opacity-10`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {categoryInfo?.name || "General"}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#023f4d] group-hover:text-teal-700 transition-colors duration-300">
                        {index + 1}. {item.question}
                      </h3>
                    </div>
                    <div
                      className={`mt-1 p-2 rounded-lg bg-gray-50 group-hover:bg-[#023f4d] transition-all duration-300`}
                    >
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 group-hover:text-white transition-all duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openIndex === index
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.answer && (
                    <div className="px-6 pb-6 -mt-2 overflow-y-auto max-h-[400px] custom-scrollbar">
                      <div
                        className="text-gray-600 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredFAQ.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-[#023f4d] mb-2">
              No results found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse all questions.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="px-6 py-3 bg-[#023f4d] text-white rounded-lg hover:bg-[#035a6d] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #023f4d;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #035a6d;
        }
      `}</style>
    </div>
  );
};

export default FAQ;
