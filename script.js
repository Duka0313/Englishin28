// ============================================================
//  EnglishIn21 – Main Script
//  Contains: shared utilities, all lesson data, all quiz data
//  No external dependencies. Uses localStorage for persistence.
// ============================================================

// ===== SHARED UTILITIES =====

/** Get array of completed lesson day numbers */
function getCompleted() {
  return JSON.parse(localStorage.getItem('completedLessons') || '[]');
}

/** Calculate daily streak (consecutive days of lessons) */
function calculateStreak() {
  const dates = JSON.parse(localStorage.getItem('lessonDates') || '{}');
  const allDates = Object.values(dates).map(d => new Date(d).toDateString());
  const unique = [...new Set(allDates)];
  if (unique.length === 0) return 0;

  unique.sort((a, b) => new Date(b) - new Date(a));
  let streak = 1;
  for (let i = 0; i < unique.length - 1; i++) {
    const diff = (new Date(unique[i]) - new Date(unique[i + 1])) / (1000 * 60 * 60 * 24);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

// Navbar hamburger toggle (shared across pages)
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => menu.classList.toggle('open'));
  }

  // Navbar scroll shadow
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(0,0,0,0.2)'
        : 'none';
    });
  }
});


// ============================================================
//  LESSON DATA – 21 Days
//  Each lesson has: title, type, icon, intro, and content
//  Types: 'Vocabulary' | 'Sentences' | 'Grammar' | 'Conversation' | 'Review'
// ============================================================
const LESSONS = {

  // ==================== WEEK 1: FOUNDATIONS ====================

  1: {
    title: "Basic Greetings & Introductions",
    type: "Vocabulary",
    icon: "👋",
    intro: "Welcome to Day 1! Today you will learn the most important words for meeting and greeting people in English. These 10 words are used every single day.",
    words: [
      { word: "Hello", meaning: "A friendly greeting", example: "Hello! My name is Amal." },
      { word: "Goodbye", meaning: "Said when leaving", example: "Goodbye! See you tomorrow." },
      { word: "Please", meaning: "Used to be polite when asking", example: "Can I have water, please?" },
      { word: "Thank you", meaning: "Express gratitude", example: "Thank you for your help." },
      { word: "Sorry", meaning: "Apologize or excuse yourself", example: "Sorry, I am late." },
      { word: "Yes", meaning: "Positive answer", example: "Yes, I understand." },
      { word: "No", meaning: "Negative answer", example: "No, that is not right." },
      { word: "Good morning", meaning: "Greeting in the morning", example: "Good morning, teacher!" },
      { word: "Good night", meaning: "Said before sleeping or leaving at night", example: "Good night! Sleep well." },
      { word: "Nice to meet you", meaning: "Said when meeting someone new", example: "Nice to meet you, I'm Nimal." }
    ]
  },

  2: {
    title: "Simple Sentences",
    type: "Sentences",
    icon: "✍️",
    intro: "Today you will learn how to build simple English sentences. The basic structure is: Subject + Verb + Object. This pattern is the backbone of English!",
    rules: [
      {
        title: "Subject + Verb",
        body: "The simplest sentence has a subject (who does it) and a verb (what they do).",
        examples: ["I run.", "She sings.", "He works.", "They study."]
      },
      {
        title: "Subject + Verb + Object",
        body: "Add an object (what or who receives the action) to give more information.",
        examples: ["I eat rice.", "She reads books.", "He plays football.", "They drink tea."]
      },
      {
        title: "Using 'is' and 'are'",
        body: "Use 'is' for one person/thing. Use 'are' for more than one.",
        examples: ["She is a student.", "They are teachers.", "The book is on the table.", "The children are happy."]
      },
      {
        title: "Negative sentences",
        body: "Add 'not' after 'is/are' or use 'do not / does not' before a verb.",
        examples: ["I do not like coffee.", "She does not play cricket.", "They are not ready.", "He is not here."]
      }
    ]
  },

  3: {
    title: "Numbers & Colors",
    type: "Vocabulary",
    icon: "🎨",
    intro: "Numbers and colors are essential vocabulary for everyday life. Learn these 10 key words today — you'll use them constantly!",
    words: [
      { word: "One, Two, Three", meaning: "Numbers 1–3", example: "I have two sisters." },
      { word: "Ten", meaning: "The number 10", example: "I am ten years old." },
      { word: "Hundred", meaning: "The number 100", example: "It costs one hundred rupees." },
      { word: "Red", meaning: "The color of fire", example: "Her bag is red." },
      { word: "Blue", meaning: "The color of the sky", example: "The sky is blue today." },
      { word: "Green", meaning: "The color of grass", example: "Sri Lanka has green hills." },
      { word: "White", meaning: "The color of milk", example: "I wear a white shirt to school." },
      { word: "Black", meaning: "The darkest color", example: "His hair is black." },
      { word: "Yellow", meaning: "The color of the sun", example: "The banana is yellow." },
      { word: "Big / Small", meaning: "Describing size", example: "The elephant is big. The ant is small." }
    ]
  },

  4: {
    title: "Family & People",
    type: "Vocabulary",
    icon: "👨‍👩‍👧",
    intro: "Today you'll learn words for family members and people around you. These words are very useful in conversations about your life.",
    words: [
      { word: "Mother", meaning: "Female parent (also: Mum/Mom)", example: "My mother cooks delicious food." },
      { word: "Father", meaning: "Male parent (also: Dad)", example: "My father goes to work every day." },
      { word: "Sister", meaning: "Female sibling", example: "I have one sister." },
      { word: "Brother", meaning: "Male sibling", example: "My brother is older than me." },
      { word: "Friend", meaning: "Someone you like and spend time with", example: "She is my best friend." },
      { word: "Teacher", meaning: "Person who teaches", example: "Our English teacher is very kind." },
      { word: "Student", meaning: "Person who studies", example: "I am a student at school." },
      { word: "Doctor", meaning: "Person who treats illness", example: "The doctor gave me medicine." },
      { word: "Grandfather", meaning: "Father's or mother's father", example: "My grandfather tells good stories." },
      { word: "Grandmother", meaning: "Father's or mother's mother", example: "My grandmother makes rice pudding." }
    ]
  },

  5: {
    title: "Food & Drinks",
    type: "Vocabulary",
    icon: "🍽️",
    intro: "Food vocabulary is essential for everyday life — at the shop, at a restaurant, or just talking about what you like to eat!",
    words: [
      { word: "Rice", meaning: "A common grain food", example: "We eat rice for lunch." },
      { word: "Bread", meaning: "Baked food made from flour", example: "I have bread for breakfast." },
      { word: "Water", meaning: "The clear liquid we drink", example: "Please give me a glass of water." },
      { word: "Milk", meaning: "White drink from a cow", example: "Children drink milk every morning." },
      { word: "Tea", meaning: "Hot drink made from tea leaves", example: "Would you like a cup of tea?" },
      { word: "Fruit", meaning: "Sweet food from trees", example: "Mangoes and bananas are my favourite fruits." },
      { word: "Vegetables", meaning: "Plants we eat as food", example: "Eat your vegetables — they are healthy!" },
      { word: "Chicken", meaning: "Meat from a chicken", example: "We had chicken curry for dinner." },
      { word: "Breakfast", meaning: "First meal of the day", example: "I eat breakfast at 7 AM." },
      { word: "Dinner", meaning: "Last meal of the day (evening)", example: "We had dinner together as a family." }
    ]
  },

  6: {
    title: "Present Tense Verbs",
    type: "Grammar",
    icon: "⚡",
    intro: "Verbs are action words. The present tense tells us what is happening NOW or what happens regularly. This is one of the most important grammar lessons!",
    rules: [
      {
        title: "Simple Present – Regular actions",
        body: "Use simple present for habits, routines, and facts. Add -s/-es for he/she/it.",
        examples: ["I study every day.", "She studies at university.", "He plays cricket on weekends.", "They live in Colombo."]
      },
      {
        title: "Present Continuous – Happening right now",
        body: "Use 'am/is/are + verb-ing' for things happening at this moment.",
        examples: ["I am reading a book.", "She is cooking dinner.", "They are playing outside.", "He is talking on the phone."]
      },
      {
        title: "Common Action Verbs",
        body: "Learn these 10 important verbs: eat, drink, go, come, read, write, speak, listen, work, study.",
        examples: ["I eat lunch at noon.", "She speaks English well.", "We go to school by bus.", "He writes in his notebook."]
      },
      {
        title: "Question Form",
        body: "To ask a question, put 'Do/Does' at the beginning.",
        examples: ["Do you speak English?", "Does she like cricket?", "Do they study at home?", "Does he drink tea?"]
      }
    ]
  },

  7: {
    title: "Week 1 Review",
    type: "Review",
    icon: "🔁",
    intro: "Great work completing Week 1! Let's review everything you've learned. Make sure you understand each topic before moving to Week 2.",
    points: [
      { title: "✅ Greetings & Common Words", body: "You can greet people, say thank you, sorry, and introduce yourself in English." },
      { title: "✅ Sentence Structure", body: "Subject + Verb + Object is the key pattern: 'I eat rice.' 'She reads books.'" },
      { title: "✅ Numbers & Colors", body: "You know numbers 1–100 and the 7 basic colors in English." },
      { title: "✅ Family Vocabulary", body: "You can talk about your family members and people in your community." },
      { title: "✅ Food & Drinks", body: "You can describe meals, your favourite foods, and order at a restaurant." },
      { title: "✅ Present Tense", body: "You can describe habits (simple present) and ongoing actions (present continuous)." },
      { title: "🎯 Week 2 Preview", body: "Next week you'll learn past tense, future tense, questions, adjectives, and have your first real conversation!" }
    ]
  },

  // ==================== WEEK 2: BUILDING SKILLS ====================

  8: {
    title: "Past Tense",
    type: "Grammar",
    icon: "⏪",
    intro: "Today you'll learn to talk about things that happened in the past. English past tense has two main patterns: regular verbs and irregular verbs.",
    rules: [
      {
        title: "Regular Past Tense (add -ed)",
        body: "For most verbs, simply add -ed to make the past tense.",
        examples: ["I walked to school yesterday.", "She cooked dinner last night.", "They played cricket on Sunday.", "He watched a film."]
      },
      {
        title: "Irregular Verbs (must memorize)",
        body: "Some common verbs change completely in the past tense. Learn these important ones: go→went, eat→ate, see→saw, come→came, buy→bought, have→had, write→wrote.",
        examples: ["I went to the market.", "She ate rice for lunch.", "We saw a film last week.", "He came home late."]
      },
      {
        title: "Past Tense Negatives",
        body: "Use 'did not' (didn't) + base verb for negatives.",
        examples: ["I did not go to school.", "She didn't eat breakfast.", "They didn't play yesterday.", "He didn't come on time."]
      },
      {
        title: "Past Tense Questions",
        body: "Use 'Did' at the beginning of questions.",
        examples: ["Did you eat breakfast?", "Did she go to work?", "Did they win the match?", "Where did he go?"]
      }
    ]
  },

  9: {
    title: "Future Tense",
    type: "Grammar",
    icon: "⏩",
    intro: "Now let's learn to talk about the future! English has two easy ways to express future plans and intentions.",
    rules: [
      {
        title: "Will + verb (for decisions & predictions)",
        body: "Use 'will' to talk about future decisions made now, or predictions.",
        examples: ["I will call you tomorrow.", "It will rain tonight.", "She will pass the exam.", "We will go on holiday."]
      },
      {
        title: "Going to + verb (for plans)",
        body: "Use 'going to' to talk about future plans already decided.",
        examples: ["I am going to study tonight.", "She is going to visit her aunt.", "They are going to watch the match.", "He is going to buy a new phone."]
      },
      {
        title: "Future Time Words",
        body: "Use these words to talk about the future: tomorrow, next week, next year, soon, later, in the future.",
        examples: ["I will see you tomorrow.", "We are going to travel next month.", "She will graduate next year.", "Call me later."]
      },
      {
        title: "Future Negatives & Questions",
        body: "Negatives: will not (won't). Questions: Will you...? Are you going to...?",
        examples: ["I won't be late.", "She won't come today.", "Will you help me?", "Are you going to study?"]
      }
    ]
  },

  10: {
    title: "Questions & Answers",
    type: "Grammar",
    icon: "❓",
    intro: "Asking good questions is essential for communication. Today you'll learn the most important question words and patterns in English.",
    rules: [
      {
        title: "Question Words (5Ws + H)",
        body: "The six essential question words: What, Who, Where, When, Why, How.",
        examples: ["What is your name?", "Who is your teacher?", "Where do you live?", "When is your birthday?", "Why are you late?", "How are you?"]
      },
      {
        title: "Yes/No Questions",
        body: "Start with Do/Does/Did/Is/Are/Was/Were to make yes/no questions.",
        examples: ["Are you a student?", "Do you speak Sinhala?", "Did you eat breakfast?", "Is this your book?"]
      },
      {
        title: "How + adjective",
        body: "Combine 'How' with an adjective to ask about amount, age, size, etc.",
        examples: ["How old are you?", "How much does it cost?", "How far is it?", "How long will it take?"]
      },
      {
        title: "Polite Questions",
        body: "Make questions more polite by adding 'Could you...?' or 'Would you mind...?'",
        examples: ["Could you repeat that, please?", "Could you help me?", "Would you mind opening the window?", "May I sit here?"]
      }
    ]
  },

  11: {
    title: "Adjectives & Adverbs",
    type: "Grammar",
    icon: "🌟",
    intro: "Adjectives describe nouns. Adverbs describe verbs or adjectives. These words make your English much more interesting and precise!",
    rules: [
      {
        title: "Common Adjectives",
        body: "Adjectives come before the noun or after 'is/are'. Learn these opposites.",
        examples: ["The food is hot / cold.", "She is tall / short.", "The bag is heavy / light.", "He is happy / sad."]
      },
      {
        title: "Using Adjectives to Compare (Comparative)",
        body: "Add -er or use 'more' to compare two things.",
        examples: ["English is easier than Maths.", "She is taller than her brother.", "This road is more dangerous than that one.", "Tea is cheaper than coffee."]
      },
      {
        title: "Superlatives (the most extreme)",
        body: "Add -est or use 'most' to talk about the extreme end.",
        examples: ["Mount Everest is the tallest mountain.", "She is the smartest in the class.", "This is the most interesting book.", "That was the best meal!"]
      },
      {
        title: "Common Adverbs",
        body: "Adverbs often end in -ly and tell us how, when, or where something happens.",
        examples: ["She speaks slowly and clearly.", "He works very hard.", "They arrived late yesterday.", "I always eat breakfast."]
      }
    ]
  },

  12: {
    title: "Prepositions",
    type: "Grammar",
    icon: "📍",
    intro: "Prepositions tell us about position, time, and direction. They're small but very important words in English!",
    rules: [
      {
        title: "Place Prepositions",
        body: "Use these to say where something is: in, on, at, under, next to, behind, in front of, between.",
        examples: ["The book is on the table.", "She lives in Colombo.", "The cat is under the chair.", "The bank is next to the school."]
      },
      {
        title: "Time Prepositions",
        body: "Use 'at' for specific times, 'on' for days, 'in' for months/years.",
        examples: ["The class starts at 8 o'clock.", "We have school on Monday.", "I was born in 2005.", "She comes home in the evening."]
      },
      {
        title: "Movement Prepositions",
        body: "To, from, into, out of, through, across, up, down.",
        examples: ["I walk to school every day.", "She came from Kandy.", "He went into the house.", "Walk across the road carefully."]
      },
      {
        title: "Common Preposition Phrases",
        body: "Learn these fixed phrases: interested in, good at, afraid of, tired of, listen to, wait for.",
        examples: ["I am interested in science.", "She is good at maths.", "Are you afraid of dogs?", "I am waiting for the bus."]
      }
    ]
  },

  13: {
    title: "Basic Conversation",
    type: "Conversation",
    icon: "💬",
    intro: "It's time to put everything together! Today you'll practice real conversations. Read each dialogue carefully and notice how the English flows naturally.",
    dialogues: [
      {
        context: "Meeting someone new at school",
        lines: [
          { speaker: "A", text: "Hello! Are you new here?" },
          { speaker: "B", text: "Yes, I just started this week. My name is Kamali." },
          { speaker: "A", text: "Nice to meet you, Kamali. I'm Ranil. Which class are you in?" },
          { speaker: "B", text: "I'm in Grade 10. What about you?" },
          { speaker: "A", text: "Me too! We are in the same class. Let me show you around." },
          { speaker: "B", text: "That's very kind of you. Thank you!" }
        ]
      },
      {
        context: "Asking for directions",
        lines: [
          { speaker: "A", text: "Excuse me, could you help me? I'm looking for the library." },
          { speaker: "B", text: "Of course! Go straight ahead, then turn left at the junction." },
          { speaker: "A", text: "How far is it from here?" },
          { speaker: "B", text: "It's about five minutes on foot. You'll see a big sign." },
          { speaker: "A", text: "Thank you very much!" },
          { speaker: "B", text: "You're welcome. Have a good day!" }
        ]
      }
    ]
  },

  14: {
    title: "Week 2 Review",
    type: "Review",
    icon: "🔁",
    intro: "Excellent! You've completed Week 2. Let's review what you've learned. You're now more than halfway through the program!",
    points: [
      { title: "✅ Past Tense", body: "Regular verbs (+ed) and irregular verbs (go→went, eat→ate). Negatives with 'did not'." },
      { title: "✅ Future Tense", body: "'Will' for decisions and 'going to' for plans. 'Won't' for negatives." },
      { title: "✅ Questions", body: "5Ws + H question words, yes/no questions, and polite question forms." },
      { title: "✅ Adjectives & Adverbs", body: "Describing words, comparatives (-er/more), superlatives (-est/most), adverbs (-ly)." },
      { title: "✅ Prepositions", body: "In/on/at for place and time. Movement prepositions. Fixed phrases." },
      { title: "✅ Conversation", body: "You had your first real English dialogue — meeting people and asking directions!" },
      { title: "🎯 Week 3 Preview", body: "In the final week, you'll learn real-world English: shopping, school/work, storytelling, writing, idioms, and more!" }
    ]
  },

  // ==================== WEEK 3: FLUENCY ====================

  15: {
    title: "At the Shop",
    type: "Conversation",
    icon: "🛒",
    intro: "Shopping is one of the most common real-world English situations. Learn how to ask for things, check prices, and complete a transaction.",
    dialogues: [
      {
        context: "At a supermarket",
        lines: [
          { speaker: "Customer", text: "Excuse me, do you have brown bread?" },
          { speaker: "Shop Assistant", text: "Yes, it's in aisle three, next to the butter." },
          { speaker: "Customer", text: "Thank you. How much is this yoghurt?" },
          { speaker: "Shop Assistant", text: "That's 150 rupees." },
          { speaker: "Customer", text: "I'll take two, please. Can I pay by card?" },
          { speaker: "Shop Assistant", text: "Of course! Please follow me to the counter." }
        ]
      },
      {
        context: "At a clothes shop",
        lines: [
          { speaker: "Customer", text: "Hello, I'm looking for a blue shirt. Do you have one in medium?" },
          { speaker: "Shop Assistant", text: "Let me check. Yes, here you are. Would you like to try it on?" },
          { speaker: "Customer", text: "Yes, please. Is there a changing room?" },
          { speaker: "Shop Assistant", text: "Yes, it's at the back on the right." },
          { speaker: "Customer", text: "It fits well. How much is it?" },
          { speaker: "Shop Assistant", text: "It's on sale today — only 800 rupees. Shall I wrap it for you?" }
        ]
      }
    ]
  },

  16: {
    title: "At School / Work",
    type: "Conversation",
    icon: "🏫",
    intro: "Most of your English interactions will happen at school or work. Learn how to communicate confidently in these important environments.",
    dialogues: [
      {
        context: "Talking to a teacher",
        lines: [
          { speaker: "Student", text: "Good morning, sir. May I ask a question about yesterday's lesson?" },
          { speaker: "Teacher", text: "Good morning! Of course, go ahead." },
          { speaker: "Student", text: "I didn't understand how to use the past perfect tense. Could you explain it again?" },
          { speaker: "Teacher", text: "Certainly. The past perfect describes something that happened before another past event. For example: 'I had finished my homework before the rain started.'" },
          { speaker: "Student", text: "I see! So it's like 'completed before'. Thank you, sir. That makes sense now." },
          { speaker: "Teacher", text: "Very good. Come and see me if you have more questions." }
        ]
      },
      {
        context: "A job interview",
        lines: [
          { speaker: "Interviewer", text: "Good afternoon. Please take a seat. Can you tell me about yourself?" },
          { speaker: "Candidate", text: "Good afternoon. My name is Priya. I graduated last year with a degree in Business Management." },
          { speaker: "Interviewer", text: "What are your strengths?" },
          { speaker: "Candidate", text: "I am hard-working, organized, and I communicate well with people. I also speak English and Sinhala fluently." },
          { speaker: "Interviewer", text: "Excellent. Why do you want to work for our company?" },
          { speaker: "Candidate", text: "I have admired your company for a long time. I believe this role will help me grow professionally." }
        ]
      }
    ]
  },

  17: {
    title: "Describing People",
    type: "Vocabulary",
    icon: "👤",
    intro: "Being able to describe people is important for storytelling, conversations, and writing. Learn words for appearance and personality!",
    words: [
      { word: "Tall / Short", meaning: "Describing height", example: "He is tall with short hair." },
      { word: "Slim / Heavy", meaning: "Describing body type", example: "She is slim and athletic." },
      { word: "Curly / Straight hair", meaning: "Describing hair type", example: "My sister has long, straight hair." },
      { word: "Kind", meaning: "Friendly and caring", example: "She is the kindest person I know." },
      { word: "Clever / Smart", meaning: "Intelligent", example: "He is very clever in mathematics." },
      { word: "Funny", meaning: "Makes people laugh", example: "My uncle is so funny!" },
      { word: "Hardworking", meaning: "Works with great effort", example: "She is hardworking and never gives up." },
      { word: "Shy / Outgoing", meaning: "Quiet vs. sociable personality", example: "I was shy at first but now I am more outgoing." },
      { word: "Patient", meaning: "Calm and willing to wait", example: "A good teacher must be patient." },
      { word: "Confident", meaning: "Believes in one's own abilities", example: "Speak confidently and people will listen." }
    ]
  },

  18: {
    title: "Telling Stories",
    type: "Grammar",
    icon: "📖",
    intro: "Great storytelling in English uses specific language to connect events and create flow. These linking words will make your stories much better!",
    rules: [
      {
        title: "Time Connectors",
        body: "Use these to show when events happened: First, Then, After that, Next, Finally, Later, Meanwhile.",
        examples: ["First, I woke up at 6 AM.", "Then I had breakfast.", "After that, I went to school.", "Finally, I came home and studied."]
      },
      {
        title: "Cause and Effect",
        body: "Show why things happened: because, so, therefore, as a result.",
        examples: ["I was late because the bus broke down.", "It was raining, so I took an umbrella.", "She studied hard. Therefore, she passed.", "He was tired. As a result, he slept early."]
      },
      {
        title: "Adding Information",
        body: "Connect ideas smoothly: and, also, in addition, moreover, furthermore.",
        examples: ["The film was exciting and funny.", "It was long. Also, it was very emotional.", "He is a good student. In addition, he helps others.", "She sings well. Moreover, she plays the violin."]
      },
      {
        title: "Story Language",
        body: "Use these phrases to make your story more vivid and engaging.",
        examples: ["One day, something unexpected happened.", "Suddenly, the lights went out.", "To my surprise, she was already there.", "In the end, everything worked out well."]
      }
    ]
  },

  19: {
    title: "Writing Emails",
    type: "Grammar",
    icon: "📧",
    intro: "Writing professional emails is a vital skill for school and work. Today you'll learn the structure and key phrases for formal and informal emails.",
    rules: [
      {
        title: "Formal Email Structure",
        body: "Subject line → Greeting → Introduction → Body → Closing → Sign-off.",
        examples: ["Subject: Request for Leave", "Dear Mr. Perera,", "I am writing to request one day of leave on Friday 15th October...", "Yours sincerely, Amali Fernando"]
      },
      {
        title: "Formal Opening Phrases",
        body: "Use these to start a professional email.",
        examples: ["I am writing to inform you that...", "I would like to apply for...", "I am writing with reference to...", "Further to our conversation..."]
      },
      {
        title: "Formal Closing Phrases",
        body: "Use these before your sign-off.",
        examples: ["I look forward to hearing from you.", "Please do not hesitate to contact me.", "Thank you for your time and consideration.", "I would appreciate your prompt response."]
      },
      {
        title: "Informal Email",
        body: "For friends and family: use casual language, start with 'Hi' and end with 'Take care' or 'Best wishes'.",
        examples: ["Hi Chaminda!", "Hope you're doing well.", "Just wanted to let you know...", "Talk soon! Best, Thilini"]
      }
    ]
  },

  20: {
    title: "Idioms & Common Phrases",
    type: "Vocabulary",
    icon: "💡",
    intro: "Idioms are phrases where the meaning is different from the individual words. Native English speakers use these all the time. Learn these 10 useful ones!",
    words: [
      { word: "Break the ice", meaning: "Start a conversation in a social situation", example: "He told a joke to break the ice at the party." },
      { word: "Hit the books", meaning: "Study hard", example: "Exams are next week — time to hit the books!" },
      { word: "Under the weather", meaning: "Feeling sick or unwell", example: "She didn't come to class because she was feeling under the weather." },
      { word: "Once in a blue moon", meaning: "Very rarely", example: "I eat fast food once in a blue moon." },
      { word: "Piece of cake", meaning: "Something very easy", example: "The maths exam was a piece of cake for him." },
      { word: "Cost an arm and a leg", meaning: "Very expensive", example: "That new phone costs an arm and a leg." },
      { word: "On the same page", meaning: "In agreement; understanding each other", example: "Let's make sure we're all on the same page before the meeting." },
      { word: "Beat around the bush", meaning: "Avoid getting to the main point", example: "Stop beating around the bush and tell me what happened!" },
      { word: "The ball is in your court", meaning: "It's your decision to make", example: "I've given you all the information. The ball is in your court." },
      { word: "Bite the bullet", meaning: "Endure a difficult situation bravely", example: "Just bite the bullet and do the exam — you'll be fine!" }
    ]
  },

  21: {
    title: "Final Review & Celebration! 🎉",
    type: "Review",
    icon: "🏆",
    intro: "Congratulations! You have completed all 21 days of English learning. This is an incredible achievement. Let's celebrate what you've accomplished!",
    points: [
      { title: "🗣️ Speaking", body: "You can greet people, ask questions, give directions, shop, and have basic conversations in English." },
      { title: "✍️ Writing", body: "You can write simple sentences, use correct tenses, and compose formal and informal emails." },
      { title: "📖 Reading", body: "You can understand simple English texts, dialogues, and instructions." },
      { title: "📚 Vocabulary", body: "You've learned 100+ new English words across greetings, food, family, shopping, work, and idioms." },
      { title: "🔧 Grammar", body: "You've mastered: present, past, and future tenses; questions; adjectives, adverbs, and prepositions; and linking words." },
      { title: "💪 What's Next?", body: "Keep practising! Watch English films with subtitles, read simple English books, and speak English whenever you can." },
      { title: "🌟 You Did It!", body: "Share your achievement with your friends and family. Remember: the best way to improve is to keep using English every day. Well done! 🎊" }
    ]
  }
};


// ============================================================
//  QUIZ DATA – 3 questions per day (63 total)
//  Each question: question, options[], correct (index), explanation
// ============================================================
const QUIZZES = {
  1: [
    {
      question: "Which phrase do you use when meeting someone for the first time?",
      options: ["Goodbye!", "Nice to meet you!", "Good night!", "Sorry!"],
      correct: 1,
      explanation: "'Nice to meet you' is the standard phrase for first meetings."
    },
    {
      question: "What does 'Please' mean?",
      options: ["To apologize", "To say goodbye", "To be polite when asking for something", "To greet someone"],
      correct: 2,
      explanation: "'Please' is added to requests to make them polite."
    },
    {
      question: "Which greeting is used in the morning?",
      options: ["Good night", "Goodbye", "Good morning", "Sorry"],
      correct: 2,
      explanation: "'Good morning' is used as a greeting before noon."
    }
  ],
  2: [
    {
      question: "Which sentence is in the correct basic order?",
      options: ["Rice I eat.", "Eat rice I.", "I eat rice.", "Rice eat I."],
      correct: 2,
      explanation: "English sentence order is Subject + Verb + Object: 'I eat rice.'"
    },
    {
      question: "Which sentence is correct?",
      options: ["She are a student.", "She is a student.", "She be a student.", "She am a student."],
      correct: 1,
      explanation: "Use 'is' with she/he/it. 'She is a student' is correct."
    },
    {
      question: "How do you make the sentence 'I like coffee' negative?",
      options: ["I not like coffee.", "I do not like coffee.", "I likes not coffee.", "Not I like coffee."],
      correct: 1,
      explanation: "Use 'do not' (don't) before the main verb for negatives with I/you/we/they."
    }
  ],
  3: [
    {
      question: "What color is grass?",
      options: ["Red", "Blue", "Yellow", "Green"],
      correct: 3,
      explanation: "Grass is green. 'The lawn is green.'"
    },
    {
      question: "Which word means 'the number 100'?",
      options: ["Ten", "Thousand", "Hundred", "Million"],
      correct: 2,
      explanation: "100 = one hundred."
    },
    {
      question: "Which describes size?",
      options: ["Red and Blue", "Big and Small", "Yes and No", "Happy and Sad"],
      correct: 1,
      explanation: "Big and Small are the main size opposites in English."
    }
  ],
  4: [
    {
      question: "What is the female word for your parent?",
      options: ["Father", "Brother", "Uncle", "Mother"],
      correct: 3,
      explanation: "Mother is the female parent. Father is the male parent."
    },
    {
      question: "Which word means 'a person who teaches'?",
      options: ["Student", "Doctor", "Teacher", "Friend"],
      correct: 2,
      explanation: "A teacher is someone who teaches others."
    },
    {
      question: "What is your 'brother'?",
      options: ["A female sibling", "A male sibling", "Your father's brother", "A friend"],
      correct: 1,
      explanation: "A brother is a male sibling — same parents as you."
    }
  ],
  5: [
    {
      question: "Which meal is the first meal of the day?",
      options: ["Dinner", "Lunch", "Supper", "Breakfast"],
      correct: 3,
      explanation: "Breakfast is the first meal of the day, eaten in the morning."
    },
    {
      question: "Which is a drink?",
      options: ["Rice", "Chicken", "Milk", "Vegetables"],
      correct: 2,
      explanation: "Milk is a drink. The others are solid foods."
    },
    {
      question: "Which sentence is correct?",
      options: ["Would you like a cup of tea?", "Would you like a cup tea?", "Would you cup of tea?", "You like a cup of tea would?"],
      correct: 0,
      explanation: "'Would you like a cup of tea?' is the correct polite offer."
    }
  ],
  6: [
    {
      question: "Which is correct for 'happening right now'?",
      options: ["I read a book.", "I am reading a book.", "I reads a book.", "I did read a book."],
      correct: 1,
      explanation: "'I am reading' (present continuous) describes what's happening at this moment."
    },
    {
      question: "How do you ask a yes/no question about habits?",
      options: ["You do drink tea?", "Do you drink tea?", "Does you drink tea?", "Drink you tea?"],
      correct: 1,
      explanation: "'Do you...?' is the correct yes/no question form for I/you/we/they."
    },
    {
      question: "Which sentence is in simple present tense?",
      options: ["She went to school.", "She is going to school.", "She goes to school every day.", "She will go to school."],
      correct: 2,
      explanation: "'She goes to school every day' describes a regular habit — simple present."
    }
  ],
  7: [
    {
      question: "What is the correct sentence structure in English?",
      options: ["Object + Verb + Subject", "Verb + Subject + Object", "Subject + Verb + Object", "Subject + Object + Verb"],
      correct: 2,
      explanation: "The basic English sentence structure is Subject + Verb + Object."
    },
    {
      question: "Which word is used for habits?",
      options: ["Yesterday", "Always", "Tomorrow", "Right now"],
      correct: 1,
      explanation: "'Always' is used with simple present for habits: 'I always eat breakfast.'"
    },
    {
      question: "Which best completes: 'My _____ cooks delicious food.'",
      options: ["Teacher", "Doctor", "Mother", "Friend"],
      correct: 2,
      explanation: "While any could work contextually, 'Mother cooks delicious food' is the classic family phrase tested here."
    }
  ],
  8: [
    {
      question: "What is the past tense of 'go'?",
      options: ["Goed", "Goes", "Going", "Went"],
      correct: 3,
      explanation: "'Go' is an irregular verb. Its past tense is 'went'."
    },
    {
      question: "Which sentence is in the past tense?",
      options: ["She cooks dinner every day.", "She cooked dinner last night.", "She is cooking dinner.", "She will cook dinner."],
      correct: 1,
      explanation: "'Cooked' is the past tense of cook (regular verb, add -ed)."
    },
    {
      question: "How do you make 'I went to school' negative?",
      options: ["I not went to school.", "I did not go to school.", "I didn't went to school.", "I not go to school."],
      correct: 1,
      explanation: "Use 'did not' + base verb: 'I did not go to school.'"
    }
  ],
  9: [
    {
      question: "Which sentence uses 'will' correctly for the future?",
      options: ["I will went home.", "I will goes home.", "I will go home.", "I will going home."],
      correct: 2,
      explanation: "'Will' is always followed by the base form of the verb: 'will go'."
    },
    {
      question: "Which talks about a future plan already decided?",
      options: ["I will maybe study.", "I am going to study tonight.", "I studied tonight.", "I study tonight."],
      correct: 1,
      explanation: "'Going to' is used for future plans already decided."
    },
    {
      question: "What is the negative of 'will'?",
      options: ["Will not / won't", "Did not", "Is not", "Do not"],
      correct: 0,
      explanation: "The negative of 'will' is 'will not', shortened to 'won't'."
    }
  ],
  10: [
    {
      question: "Which question word asks about a PLACE?",
      options: ["When", "Why", "Where", "How"],
      correct: 2,
      explanation: "'Where' asks about location or place."
    },
    {
      question: "Which is the correct question form?",
      options: ["You are a student?", "Are you a student?", "A student are you?", "You a student are?"],
      correct: 1,
      explanation: "In English yes/no questions, the verb comes before the subject: 'Are you...?'"
    },
    {
      question: "Which is the most polite way to ask for help?",
      options: ["Give me help.", "Help me!", "Could you help me, please?", "You help me?"],
      correct: 2,
      explanation: "'Could you...please?' is a polite way to make a request."
    }
  ],
  11: [
    {
      question: "Which word is an adjective?",
      options: ["Run", "Quickly", "Beautiful", "She"],
      correct: 2,
      explanation: "'Beautiful' is an adjective — it describes a noun."
    },
    {
      question: "Which sentence uses a comparative adjective?",
      options: ["She is tall.", "She is the tallest.", "She is taller than her brother.", "She is very tall."],
      correct: 2,
      explanation: "'Taller than' is a comparative form, comparing two people."
    },
    {
      question: "Which word is an adverb?",
      options: ["Slow", "Slowly", "Slowness", "Slowed"],
      correct: 1,
      explanation: "Adverbs often end in -ly. 'Slowly' describes how something is done."
    }
  ],
  12: [
    {
      question: "Which preposition is correct: 'The book is ___ the table.'",
      options: ["in", "on", "at", "by"],
      correct: 1,
      explanation: "Use 'on' for surfaces: 'The book is on the table.'"
    },
    {
      question: "Which is correct for a specific time?",
      options: ["I wake up on 6 o'clock.", "I wake up in 6 o'clock.", "I wake up at 6 o'clock.", "I wake up by 6 o'clock."],
      correct: 2,
      explanation: "Use 'at' with specific clock times: 'at 6 o'clock'."
    },
    {
      question: "Which sentence uses a preposition correctly?",
      options: ["I am interested in science.", "I am interested of science.", "I am interested at science.", "I am interested for science."],
      correct: 0,
      explanation: "The fixed phrase is 'interested in': 'I am interested in science.'"
    }
  ],
  13: [
    {
      question: "What do you say when you want to start talking to a stranger politely?",
      options: ["Hey you!", "Stop!", "Excuse me.", "What do you want?"],
      correct: 2,
      explanation: "'Excuse me' is the polite way to get someone's attention."
    },
    {
      question: "How do you respond to 'Thank you very much'?",
      options: ["No problem.", "You're welcome.", "Good morning.", "See you later."],
      correct: 1,
      explanation: "'You're welcome' is the standard response to 'thank you'."
    },
    {
      question: "In a conversation, someone says 'Go straight then turn left'. What do you reply to confirm you understand?",
      options: ["Sorry, I don't understand.", "Thank you, that's very helpful!", "What is your name?", "Goodbye!"],
      correct: 1,
      explanation: "Saying 'Thank you, that's very helpful' confirms understanding and is polite."
    }
  ],
  14: [
    {
      question: "Which correctly describes something that happened in the past?",
      options: ["I go to Kandy yesterday.", "I went to Kandy yesterday.", "I am going to Kandy yesterday.", "I will go to Kandy yesterday."],
      correct: 1,
      explanation: "'Went' is the past tense of 'go'. Use it with 'yesterday'."
    },
    {
      question: "Which question asks about quantity or amount?",
      options: ["Where is it?", "Who is she?", "How much does it cost?", "Why are you late?"],
      correct: 2,
      explanation: "'How much' asks about price or amount."
    },
    {
      question: "Which sentence uses the future tense for a plan?",
      options: ["I ate lunch.", "I eat lunch now.", "I am going to eat lunch later.", "I always eat lunch."],
      correct: 2,
      explanation: "'Going to' describes a future plan: 'I am going to eat lunch later.'"
    }
  ],
  15: [
    {
      question: "How do you politely ask for the price of something in a shop?",
      options: ["What is the money?", "Give me the price.", "How much is this?", "Price, please!"],
      correct: 2,
      explanation: "'How much is this?' is the standard polite question for prices."
    },
    {
      question: "The shop assistant says: 'Would you like to try it on?' What does 'try it on' mean?",
      options: ["Buy the item", "Wear the item to see if it fits", "Return the item", "Test the item for quality"],
      correct: 1,
      explanation: "'Try on' means to wear clothing to see if it fits before buying."
    },
    {
      question: "How do you ask to pay using a card?",
      options: ["I want card.", "Can I pay by card?", "Card money please.", "Give me card payment."],
      correct: 1,
      explanation: "'Can I pay by card?' is the correct and natural way to ask."
    }
  ],
  16: [
    {
      question: "How do you politely ask a teacher for permission to ask a question?",
      options: ["Hey teacher, question!", "May I ask a question?", "I want ask you question.", "Question time?"],
      correct: 1,
      explanation: "'May I ask a question?' is a polite, formal request."
    },
    {
      question: "In an interview, which is the best answer to 'Tell me about yourself'?",
      options: ["I don't know what to say.", "My name is Priya and I graduated last year.", "I am very good.", "I like this company."],
      correct: 1,
      explanation: "A good answer starts with your name and a relevant fact, like your education."
    },
    {
      question: "What does 'fluently' mean?",
      options: ["Speaking slowly", "Speaking with many mistakes", "Speaking easily and naturally", "Speaking a little"],
      correct: 2,
      explanation: "'Fluently' means speaking easily, naturally, and without difficulty."
    }
  ],
  17: [
    {
      question: "Which word describes someone who works with great effort?",
      options: ["Shy", "Hardworking", "Funny", "Slim"],
      correct: 1,
      explanation: "'Hardworking' describes a person who puts in a lot of effort."
    },
    {
      question: "What is the opposite of 'shy'?",
      options: ["Tall", "Clever", "Outgoing", "Patient"],
      correct: 2,
      explanation: "Shy means quiet and reserved. Outgoing means sociable and confident."
    },
    {
      question: "Which word describes someone's HEIGHT?",
      options: ["Kind", "Tall", "Funny", "Hardworking"],
      correct: 1,
      explanation: "'Tall' and 'short' describe a person's height."
    }
  ],
  18: [
    {
      question: "Which word shows the ORDER of events in a story?",
      options: ["Because", "But", "First", "Very"],
      correct: 2,
      explanation: "'First, then, after that, finally' are time connectors that show order."
    },
    {
      question: "Which word shows CAUSE and EFFECT?",
      options: ["Meanwhile", "Also", "Because", "Then"],
      correct: 2,
      explanation: "'Because' shows why something happened: 'I was late because the bus broke down.'"
    },
    {
      question: "Which phrase makes a story more vivid and unexpected?",
      options: ["On a Monday.", "Suddenly, the lights went out.", "I went home.", "She ate food."],
      correct: 1,
      explanation: "'Suddenly' is a story language word that creates drama and surprise."
    }
  ],
  19: [
    {
      question: "Which is the correct formal email greeting?",
      options: ["Hey Perera!", "Yo sir!", "Dear Mr. Perera,", "Hello to you!"],
      correct: 2,
      explanation: "Formal emails start with 'Dear [Title] [Last name],'."
    },
    {
      question: "Which phrase is best for starting a formal email?",
      options: ["Just wanted to say...", "I am writing to inform you that...", "Hi! Hope you're good!", "Guess what..."],
      correct: 1,
      explanation: "'I am writing to inform you that...' is a standard formal opening."
    },
    {
      question: "Which is a formal email sign-off?",
      options: ["Talk soon!", "Yours sincerely,", "BYE!", "Cheers mate,"],
      correct: 1,
      explanation: "'Yours sincerely' or 'Yours faithfully' are formal email closings."
    }
  ],
  20: [
    {
      question: "What does 'hit the books' mean?",
      options: ["Throw books", "Study hard", "Buy new books", "Destroy books"],
      correct: 1,
      explanation: "'Hit the books' is an idiom meaning to study hard."
    },
    {
      question: "If something 'costs an arm and a leg', it means it is...?",
      options: ["Free", "Very expensive", "Broken", "On sale"],
      correct: 1,
      explanation: "'Costs an arm and a leg' means something is very expensive."
    },
    {
      question: "What does 'under the weather' mean?",
      options: ["Outside in the rain", "Feeling sick or unwell", "Standing under a tree", "Very cold"],
      correct: 1,
      explanation: "'Under the weather' is an idiom meaning feeling unwell or slightly sick."
    }
  ],
  21: [
    {
      question: "You have completed all 21 days! What is the BEST thing to do next?",
      options: ["Stop learning English forever.", "Keep practising: watch films, read, and speak English every day.", "Only learn grammar rules.", "Never use English again."],
      correct: 1,
      explanation: "Consistent daily practice is the best way to maintain and improve your English."
    },
    {
      question: "Which is a good way to improve your English speaking?",
      options: ["Only read grammar books.", "Watch English films with subtitles.", "Avoid speaking to anyone.", "Write but never speak."],
      correct: 1,
      explanation: "Watching films with subtitles exposes you to natural spoken English."
    },
    {
      question: "What is an idiom?",
      options: ["A type of verb", "A phrase whose meaning differs from the individual words", "A formal grammar rule", "A punctuation mark"],
      correct: 1,
      explanation: "An idiom is a phrase with a figurative meaning different from the literal words."
    }
  ]
};

// ============================================================
//  WEEK 4 LESSONS – Days 22–28 (Advanced English)
// ============================================================
const LESSONS_WEEK4 = {
  22: {
    title: "Business English",
    type: "Conversation",
    icon: "💼",
    intro: "Professional English is essential for career success. Today you'll learn key phrases and conversations used in business settings — meetings, negotiations, and professional communication.",
    dialogues: [
      {
        context: "Running a team meeting",
        lines: [
          { speaker: "Manager", text: "Good morning everyone. Let's get started. The main agenda today is the Q3 report." },
          { speaker: "Team Member", text: "Could we also discuss the new project timeline?" },
          { speaker: "Manager", text: "Absolutely. We'll cover that in the second half. First, let's look at last month's results." },
          { speaker: "Team Member", text: "I'd like to highlight that our customer satisfaction score increased by 15%." },
          { speaker: "Manager", text: "Excellent point. That's a significant achievement. Well done to the team." },
          { speaker: "Team Member", text: "Thank you. I'll circulate the full report by end of day." }
        ]
      },
      {
        context: "Negotiating a deal",
        lines: [
          { speaker: "Client", text: "We're interested in your services, but the price is a bit high for our budget." },
          { speaker: "Sales Rep", text: "I understand your concern. Could you share your budget range with me?" },
          { speaker: "Client", text: "We were hoping to stay around 50,000 rupees per month." },
          { speaker: "Sales Rep", text: "I think we can work with that. If we adjust the package slightly, I can make it work." },
          { speaker: "Client", text: "That sounds reasonable. Can we put something in writing?" },
          { speaker: "Sales Rep", text: "Of course. I'll send a revised proposal by tomorrow morning." }
        ]
      }
    ]
  },

  23: {
    title: "Conditionals (If Sentences)",
    type: "Grammar",
    icon: "🔀",
    intro: "Conditional sentences let you talk about possibilities, hypotheses, and consequences. There are four main types — mastering them will transform your English fluency!",
    rules: [
      {
        title: "Zero Conditional – General Truths",
        body: "Use for facts and things that are always true. Structure: If + present simple, present simple.",
        examples: ["If you heat water to 100°C, it boils.", "If it rains, the ground gets wet.", "If you study hard, you get good results.", "If you mix red and blue, you get purple."]
      },
      {
        title: "First Conditional – Real Possibility",
        body: "For things that are likely to happen in the future. Structure: If + present simple, will + verb.",
        examples: ["If it rains tomorrow, I will stay home.", "If you study tonight, you will pass the exam.", "If she arrives early, she will save a seat.", "If I get the job, I will celebrate!"]
      },
      {
        title: "Second Conditional – Imaginary Situations",
        body: "For unlikely or hypothetical situations. Structure: If + past simple, would + verb.",
        examples: ["If I had a million rupees, I would travel the world.", "If she spoke English fluently, she would get the job.", "If I were you, I would apologise.", "What would you do if you won the lottery?"]
      },
      {
        title: "Third Conditional – Past Regrets",
        body: "For things that did NOT happen in the past. Structure: If + past perfect, would have + past participle.",
        examples: ["If I had studied harder, I would have passed.", "If she had left earlier, she wouldn't have been late.", "If we had known, we would have helped.", "He wouldn't have got lost if he had used a map."]
      }
    ]
  },

  24: {
    title: "Passive Voice",
    type: "Grammar",
    icon: "🔄",
    intro: "The passive voice shifts the focus from who does the action to what receives the action. It is widely used in formal writing, news, and academic English.",
    rules: [
      {
        title: "What is the Passive Voice?",
        body: "Active: The chef cooked the meal. Passive: The meal was cooked (by the chef). Structure: Object + be + past participle.",
        examples: ["The letter was written by Amali.", "The window was broken.", "English is spoken worldwide.", "The bridge was built in 1960."]
      },
      {
        title: "Passive in Different Tenses",
        body: "The passive can be used in any tense — just change the form of 'be'.",
        examples: ["Present: The shop is closed every Sunday.", "Past: The book was published last year.", "Future: The results will be announced tomorrow.", "Present perfect: The building has been renovated."]
      },
      {
        title: "When to Use the Passive",
        body: "Use when: the doer is unknown, unimportant, or obvious. Common in news, science, and formal writing.",
        examples: ["The suspect was arrested last night. (news)", "The experiment was conducted over 6 months. (science)", "Mistakes were made. (formal/diplomatic)", "The documents have been signed."]
      },
      {
        title: "Passive with 'by'",
        body: "Add 'by + agent' only when the doer is important or surprising.",
        examples: ["The theory was developed by Einstein.", "The song was written by a teenager.", "The prize was awarded by the President.", "The app was created by a local developer."]
      }
    ]
  },

  25: {
    title: "Phrasal Verbs",
    type: "Vocabulary",
    icon: "🔗",
    intro: "Phrasal verbs are combinations of a verb + preposition/adverb that create a new meaning. They are extremely common in spoken English — learn these 10 essential ones!",
    words: [
      { word: "Give up", meaning: "Stop trying; quit", example: "Don't give up — you're nearly there!" },
      { word: "Look up", meaning: "Search for information", example: "I'll look up the word in the dictionary." },
      { word: "Turn up / Turn down", meaning: "Increase/decrease OR to arrive / to refuse", example: "Can you turn up the volume? She turned down the job offer." },
      { word: "Carry on", meaning: "Continue doing something", example: "Carry on with your work — I'll be back soon." },
      { word: "Find out", meaning: "Discover or get information", example: "I need to find out what time the bus leaves." },
      { word: "Set up", meaning: "Establish or arrange something", example: "He set up a new business last year." },
      { word: "Come across", meaning: "Find something unexpectedly", example: "I came across an old photo while cleaning." },
      { word: "Get along (with)", meaning: "Have a friendly relationship", example: "She gets along well with her colleagues." },
      { word: "Put off", meaning: "Postpone; delay", example: "Don't put off your revision until the last day." },
      { word: "Break down", meaning: "Stop working (machine) OR lose emotional control", example: "The car broke down on the motorway. She broke down in tears." }
    ]
  },

  26: {
    title: "Academic Writing",
    type: "Grammar",
    icon: "🎓",
    intro: "Academic English is needed for university essays, reports, and formal assignments. Today you'll learn key academic phrases and essay structure that will impress any examiner.",
    rules: [
      {
        title: "Essay Structure",
        body: "A strong academic essay has three parts: Introduction (state your argument), Body Paragraphs (evidence + analysis), Conclusion (summarise + restate).",
        examples: ["Introduction: 'This essay will argue that…'", "Body: 'Firstly… Furthermore… However…'", "Conclusion: 'In conclusion, it is clear that…'", "Topic sentence: 'One key advantage of X is…'"]
      },
      {
        title: "Formal Academic Vocabulary",
        body: "Replace informal words with academic ones: think → argue/suggest, big → significant, show → demonstrate, use → utilise.",
        examples: ["'This demonstrates a significant improvement.'", "'The data suggests that attitudes are changing.'", "'Several factors contribute to this phenomenon.'", "'This argument is further supported by…'"]
      },
      {
        title: "Hedging Language (Careful Claims)",
        body: "In academic writing, avoid being too absolute. Use hedging words to show uncertainty appropriately.",
        examples: ["'It could be argued that…'", "'The evidence suggests that…'", "'This may indicate…'", "'In most cases… / Generally speaking…'"]
      },
      {
        title: "Linking & Transition Words",
        body: "Connect ideas professionally with these academic connectors.",
        examples: ["Addition: Furthermore, Moreover, In addition to this…", "Contrast: However, Nevertheless, On the other hand…", "Reason: Due to, As a result of, Consequently…", "Example: For instance, To illustrate, Notably…"]
      }
    ]
  },

  27: {
    title: "Social English & Small Talk",
    type: "Conversation",
    icon: "☕",
    intro: "Small talk — casual conversation — is a crucial social skill in English-speaking environments. Learn how to start conversations, keep them going, and exit politely.",
    dialogues: [
      {
        context: "Small talk at a coffee shop",
        lines: [
          { speaker: "A", text: "Lovely weather today, isn't it? Perfect for a coffee." },
          { speaker: "B", text: "It really is! I always find it hard to work when the sun is shining." },
          { speaker: "A", text: "Ha, same! Do you work nearby?" },
          { speaker: "B", text: "Yes, just up the road. I work at the tech company on Main Street." },
          { speaker: "A", text: "Oh interesting! What do you do there?" },
          { speaker: "B", text: "I'm a software developer. It's great work, very flexible. What about you?" }
        ]
      },
      {
        context: "Catching up with an acquaintance",
        lines: [
          { speaker: "A", text: "Hi! I haven't seen you in ages! How have you been?" },
          { speaker: "B", text: "Really well, thanks! I actually just got back from a trip to Japan." },
          { speaker: "A", text: "No way! How was it? I've always wanted to go." },
          { speaker: "B", text: "It was absolutely amazing. The food, the culture — everything was incredible." },
          { speaker: "A", text: "I'll have to pick your brain about it sometime. I'm thinking of going next year." },
          { speaker: "B", text: "Definitely! Let's grab a coffee and I'll tell you everything. I have so many tips!" }
        ]
      }
    ]
  },

  28: {
    title: "Week 4 Review & Beyond",
    type: "Review",
    icon: "🚀",
    intro: "Outstanding! You've gone beyond 21 days and completed Week 4. You're now at an intermediate English level. Let's review your advanced achievements!",
    points: [
      { title: "✅ Business English", body: "You can confidently participate in professional meetings, negotiate, and communicate in a work environment." },
      { title: "✅ Conditionals", body: "You master all four conditional forms: zero (facts), first (real), second (hypothetical), and third (past regrets)." },
      { title: "✅ Passive Voice", body: "You can use and identify passive constructions across all tenses — essential for formal and academic writing." },
      { title: "✅ Phrasal Verbs", body: "You know 10 essential phrasal verbs: give up, look up, set up, carry on, find out, break down, and more." },
      { title: "✅ Academic Writing", body: "You can structure an essay, use formal vocabulary, employ hedging language, and link ideas professionally." },
      { title: "✅ Social English", body: "You can make small talk, start conversations naturally, and build social connections in English." },
      { title: "🌟 You're Intermediate Level!", body: "You've completed 28 days of English. Keep reading books, watching films, and speaking English daily. Consider joining an English conversation club or app to practice with others. You've come so far — don't stop now! 🎉" }
    ]
  }
};

// Merge Week 4 into LESSONS
Object.assign(LESSONS, LESSONS_WEEK4);

// Add Week 4 quizzes
const QUIZZES_WEEK4 = {
  22: [
    {
      question: "In a business meeting, how do you politely suggest adding an item to the agenda?",
      options: ["Add my topic!", "Could we also discuss the new timeline?", "I want to talk about something.", "Hey, let me speak."],
      correct: 1,
      explanation: "'Could we also discuss…?' is the polite, professional way to suggest an addition."
    },
    {
      question: "What does 'I'll circulate the report' mean in a business context?",
      options: ["Read the report out loud", "Delete the report", "Send or share the report with everyone", "Write a new report"],
      correct: 2,
      explanation: "'Circulate' in business means to distribute or share something with all relevant people."
    },
    {
      question: "Which phrase is best for starting a negotiation about price?",
      options: ["Your price is too high!", "Could you share your budget range with me?", "That's too expensive, no deal.", "Money is a problem."],
      correct: 1,
      explanation: "Asking for the budget range opens dialogue professionally without being confrontational."
    }
  ],
  23: [
    {
      question: "Which conditional is used for a REAL future possibility?",
      options: ["If I were rich, I would travel.", "If you heat ice, it melts.", "If it rains, I will stay home.", "If she had studied, she would have passed."],
      correct: 2,
      explanation: "First conditional (If + present, will + verb) describes a real, likely future scenario."
    },
    {
      question: "Which sentence is in the second conditional (imaginary situation)?",
      options: ["If you study, you'll pass.", "If she had come, we would have met.", "If I were you, I would apologise.", "If you freeze water, it becomes ice."],
      correct: 2,
      explanation: "Second conditional uses 'If + past simple, would + verb' for imaginary/hypothetical situations."
    },
    {
      question: "What does the third conditional express?",
      options: ["A future plan", "A general fact", "A real possibility", "A past situation that did not happen"],
      correct: 3,
      explanation: "Third conditional (If + past perfect, would have + past participle) describes unrealised past situations."
    }
  ],
  24: [
    {
      question: "Which sentence is in the PASSIVE voice?",
      options: ["The chef cooked the meal.", "The meal was cooked by the chef.", "She wrote the letter.", "He broke the window."],
      correct: 1,
      explanation: "Passive voice: Object + was/were + past participle. 'The meal was cooked' is passive."
    },
    {
      question: "How do you make 'They will announce results tomorrow' passive?",
      options: ["Tomorrow results announces.", "The results will be announced tomorrow.", "The results were announced tomorrow.", "Results are announcing tomorrow."],
      correct: 1,
      explanation: "Future passive: Subject + will be + past participle: 'The results will be announced.'"
    },
    {
      question: "When is the passive voice most commonly used?",
      options: ["In casual conversation", "When the doer is unknown or unimportant", "Only in the present tense", "Only in questions"],
      correct: 1,
      explanation: "Passive is used when the doer is unknown, unimportant, or obvious — common in news and formal writing."
    }
  ],
  25: [
    {
      question: "What does 'give up' mean?",
      options: ["Continue working", "Start something new", "Stop trying; quit", "Give something as a gift"],
      correct: 2,
      explanation: "'Give up' means to stop trying or abandon an effort."
    },
    {
      question: "Which sentence uses 'put off' correctly?",
      options: ["She put off her shoes.", "Don't put off your revision until the last day.", "He put off the lights brightly.", "I put off a smile."],
      correct: 1,
      explanation: "'Put off' means to postpone or delay: 'Don't put off your revision.'"
    },
    {
      question: "What does 'come across' mean?",
      options: ["Travel across a country", "Get angry with someone", "Find something unexpectedly", "Cross a road"],
      correct: 2,
      explanation: "'Come across' means to find or encounter something unexpectedly."
    }
  ],
  26: [
    {
      question: "Which sentence uses appropriate academic vocabulary?",
      options: ["This shows a big change.", "I think things got better.", "The data demonstrates a significant improvement.", "It's pretty obvious that things changed."],
      correct: 2,
      explanation: "'Demonstrates' and 'significant' are formal academic vocabulary choices."
    },
    {
      question: "Which is an example of 'hedging language' in academic writing?",
      options: ["This is definitely true.", "Everyone agrees that…", "The evidence suggests that…", "There is no doubt that…"],
      correct: 2,
      explanation: "'The evidence suggests that' is hedging — it avoids an absolute claim and shows appropriate caution."
    },
    {
      question: "Which transition word shows CONTRAST?",
      options: ["Furthermore", "In addition", "However", "For instance"],
      correct: 2,
      explanation: "'However' signals a contrast or opposing idea — a key academic connector."
    }
  ],
  27: [
    {
      question: "What is 'small talk'?",
      options: ["Speaking very quietly", "Short, casual conversation on neutral topics", "Talking to children", "Formal business communication"],
      correct: 1,
      explanation: "Small talk is casual, friendly conversation about neutral topics like weather, work, or travel."
    },
    {
      question: "Which is a good small talk opener?",
      options: ["What is your salary?", "Lovely weather today, isn't it?", "Why are you here?", "You look tired."],
      correct: 1,
      explanation: "Commenting on the weather is a classic, safe small talk opener in English culture."
    },
    {
      question: "What does 'pick your brain' mean in context?",
      options: ["Test your intelligence", "Ask for your knowledge or advice", "Remove something from your mind", "Challenge you to a debate"],
      correct: 1,
      explanation: "'Pick your brain' is an idiom meaning to ask someone for their knowledge or advice on a topic."
    }
  ],
  28: [
    {
      question: "Which is the correct passive form of 'They built the bridge in 1990'?",
      options: ["The bridge built in 1990.", "The bridge was built in 1990.", "The bridge were built in 1990.", "Built was the bridge in 1990."],
      correct: 1,
      explanation: "Past passive: Subject + was/were + past participle: 'The bridge was built.'"
    },
    {
      question: "Which sentence uses the first conditional correctly?",
      options: ["If I would study, I pass.", "If I study tonight, I will pass.", "If I studied, I passed.", "If I had studied, I will pass."],
      correct: 1,
      explanation: "First conditional: If + present simple, will + base verb."
    },
    {
      question: "Which phrasal verb means 'to continue'?",
      options: ["Give up", "Break down", "Carry on", "Put off"],
      correct: 2,
      explanation: "'Carry on' means to continue with an activity."
    }
  ]
};

Object.assign(QUIZZES, QUIZZES_WEEK4);

// ============================================================
//  ACHIEVEMENT BADGES SYSTEM
// ============================================================
const BADGES = [
  { id: 'first_step',    icon: '👣', name: 'First Step',      desc: 'Complete your first lesson',          check: (c,q,nb) => c.length >= 1 },
  { id: 'week1',        icon: '🌱', name: 'Week 1 Done',      desc: 'Complete all 7 Week 1 lessons',       check: (c) => [1,2,3,4,5,6,7].every(d=>c.includes(d)) },
  { id: 'week2',        icon: '🌿', name: 'Week 2 Done',      desc: 'Complete all 7 Week 2 lessons',       check: (c) => [8,9,10,11,12,13,14].every(d=>c.includes(d)) },
  { id: 'week3',        icon: '🌳', name: 'Week 3 Done',      desc: 'Complete all 7 Week 3 lessons',       check: (c) => [15,16,17,18,19,20,21].every(d=>c.includes(d)) },
  { id: 'week4',        icon: '🚀', name: 'Week 4 Done',      desc: 'Complete all 7 Week 4 lessons',       check: (c) => [22,23,24,25,26,27,28].every(d=>c.includes(d)) },
  { id: 'halfway',      icon: '⭐', name: 'Halfway There',    desc: 'Complete 14 lessons',                 check: (c) => c.length >= 14 },
  { id: 'champion',     icon: '🏆', name: '21-Day Champion',  desc: 'Complete all 21 original lessons',    check: (c) => c.filter(d=>d<=21).length >= 21 },
  { id: 'beyond',       icon: '💎', name: 'Beyond 21',        desc: 'Complete all 28 lessons',             check: (c) => c.length >= 28 },
  { id: 'streak3',      icon: '🔥', name: '3-Day Streak',     desc: 'Study 3 days in a row',               check: (c) => calculateStreak() >= 3 },
  { id: 'streak7',      icon: '⚡', name: '7-Day Streak',     desc: 'Study 7 days in a row',               check: (c) => calculateStreak() >= 7 },
  { id: 'perfect_quiz', icon: '💯', name: 'Perfect Score',    desc: 'Get 100% on any quiz',                check: (c,q) => Object.values(q).some(s=>s.pct===100) },
  { id: 'quiz_master',  icon: '🎯', name: 'Quiz Master',      desc: 'Complete 10 quizzes',                 check: (c,q) => Object.keys(q).length >= 10 },
  { id: 'note_taker',   icon: '📝', name: 'Note Taker',       desc: 'Write your first notebook entry',     check: (c,q,nb) => nb && nb.length >= 1 },
  { id: 'scholar',      icon: '📚', name: 'Scholar',          desc: 'Write 5 notebook entries',            check: (c,q,nb) => nb && nb.length >= 5 }
];

function getEarnedBadges() {
  const completed = getCompleted();
  const quizScores = JSON.parse(localStorage.getItem('quizScores') || '{}');
  const notebook = JSON.parse(localStorage.getItem('notebook') || '[]');
  const earned = JSON.parse(localStorage.getItem('earnedBadges') || '[]');

  const newlyEarned = [];
  BADGES.forEach(badge => {
    if (!earned.includes(badge.id) && badge.check(completed, quizScores, notebook)) {
      earned.push(badge.id);
      newlyEarned.push(badge);
    }
  });

  if (newlyEarned.length > 0) {
    localStorage.setItem('earnedBadges', JSON.stringify(earned));
  }

  return { earned, newlyEarned };
}

function showBadgeNotification(badge) {
  const notif = document.createElement('div');
  notif.className = 'badge-notif';
  notif.innerHTML = `
    <div class="bn-icon-wrap">${badge.icon}</div>
    <div class="bn-text">
      <div class="bn-title">Badge Unlocked!</div>
      <div class="bn-name">${badge.name}</div>
    </div>
  `;
  document.body.appendChild(notif);
  setTimeout(() => notif.classList.add('show'), 100);
  setTimeout(() => {
    notif.classList.remove('show');
    setTimeout(() => notif.remove(), 400);
  }, 3500);
}

function checkAndShowBadges() {
  const { newlyEarned } = getEarnedBadges();
  newlyEarned.forEach((badge, i) => {
    setTimeout(() => showBadgeNotification(badge), i * 1000);
  });
}

// ============================================================
//  PERSONAL NOTEBOOK
// ============================================================
function getNotebook() {
  return JSON.parse(localStorage.getItem('notebook') || '[]');
}

function saveNote(text, lessonDay) {
  const notes = getNotebook();
  const note = {
    id: Date.now(),
    text: text.trim(),
    lessonDay: lessonDay || null,
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    timestamp: Date.now()
  };
  notes.unshift(note);
  localStorage.setItem('notebook', JSON.stringify(notes));
  checkAndShowBadges();
  return note;
}

function deleteNote(id) {
  const notes = getNotebook().filter(n => n.id !== id);
  localStorage.setItem('notebook', JSON.stringify(notes));
}

// ============================================================
//  LOCAL LEADERBOARD
// ============================================================
function getLeaderboard() {
  return JSON.parse(localStorage.getItem('leaderboard') || '[]');
}

function addToLeaderboard(name) {
  const completed = getCompleted();
  const quizScores = JSON.parse(localStorage.getItem('quizScores') || '{}');
  const streak = calculateStreak();
  const badges = JSON.parse(localStorage.getItem('earnedBadges') || '[]');

  const totalQuizPct = Object.values(quizScores).reduce((s, q) => s + q.pct, 0);
  const avgQuiz = Object.keys(quizScores).length > 0
    ? Math.round(totalQuizPct / Object.keys(quizScores).length) : 0;

  const score = (completed.length * 10) + (streak * 5) + (avgQuiz * 2) + (badges.length * 15);

  const board = getLeaderboard().filter(e => e.name !== name);
  board.push({ name, score, lessons: completed.length, streak, avgQuiz, badges: badges.length, date: new Date().toLocaleDateString() });
  board.sort((a, b) => b.score - a.score);
  localStorage.setItem('leaderboard', JSON.stringify(board.slice(0, 20)));
  return board;
}

// ============================================================
//  EXPORT USER DATA (CSV)
// ============================================================
function exportUserDataCSV() {
  const completed = getCompleted();
  const quizScores = JSON.parse(localStorage.getItem('quizScores') || '{}');
  const dates = JSON.parse(localStorage.getItem('lessonDates') || '{}');
  const notebook = getNotebook();
  const badges = JSON.parse(localStorage.getItem('earnedBadges') || '[]');

  let csv = 'Type,Day/ID,Title/Content,Date,Score,Percentage\n';

  // Lesson completions
  completed.forEach(day => {
    const lesson = LESSONS[day];
    const date = dates[day] || '';
    csv += `Lesson,${day},"${lesson ? lesson.title.replace(/"/g, '""') : 'Unknown'}","${date}",,\n`;
  });

  // Quiz scores
  Object.keys(quizScores).forEach(day => {
    const s = quizScores[day];
    const lesson = LESSONS[day];
    csv += `Quiz,${day},"${lesson ? lesson.title.replace(/"/g, '""') : 'Unknown'}","",${s.score}/${s.total},${s.pct}%\n`;
  });

  // Notebook entries
  notebook.forEach(note => {
    csv += `Note,${note.lessonDay || '-'},"${note.text.replace(/"/g, '""').replace(/\n/g, ' ')}","${note.date}",,\n`;
  });

  // Badges
  badges.forEach(badgeId => {
    const badge = BADGES.find(b => b.id === badgeId);
    if (badge) csv += `Badge,-,"${badge.icon} ${badge.name} — ${badge.desc}","",, \n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `english21-progress-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ============================================================
//  DAILY REMINDER (Notification)
// ============================================================
function requestNotificationPermission() {
  if (!('Notification' in window)) return Promise.resolve('unsupported');
  if (Notification.permission === 'granted') return Promise.resolve('granted');
  return Notification.requestPermission();
}

function scheduleReminder(hour = 19, minute = 0) {
  const settings = { hour, minute, enabled: true };
  localStorage.setItem('reminderSettings', JSON.stringify(settings));
}

function getReminderSettings() {
  return JSON.parse(localStorage.getItem('reminderSettings') || 'null');
}

function disableReminder() {
  const s = getReminderSettings();
  if (s) {
    s.enabled = false;
    localStorage.setItem('reminderSettings', JSON.stringify(s));
  }
}

function checkDailyReminder() {
  const settings = getReminderSettings();
  if (!settings || !settings.enabled) return;
  if (Notification.permission !== 'granted') return;

  const now = new Date();
  const lastShown = localStorage.getItem('lastReminderDate');
  const today = now.toDateString();

  if (lastShown === today) return;

  const scheduledTime = new Date();
  scheduledTime.setHours(settings.hour, settings.minute, 0, 0);

  const diff = scheduledTime - now;
  const delay = diff > 0 ? diff : 0;

  const completed = getCompleted();
  const next = Math.min(completed.length + 1, 28);

  setTimeout(() => {
    if (localStorage.getItem('lastReminderDate') === today) return;
    localStorage.setItem('lastReminderDate', today);
    try {
      new Notification('📚 English21 – Daily Lesson', {
        body: `Don't forget your lesson today! Day ${next} is waiting for you.`,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📚</text></svg>',
        tag: 'english21-reminder'
      });
    } catch(e) {}
  }, delay);
}

// Run reminder check on page load
document.addEventListener('DOMContentLoaded', checkDailyReminder);

