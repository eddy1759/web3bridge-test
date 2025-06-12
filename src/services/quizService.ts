export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  questionCount: number;
}

export interface LeaderboardEntry {
  playerName: string;
  score: number;
  totalQuestions: number;
  category: string;
  timestamp: Date;
}

class QuizService {
  private categories: QuizCategory[] = [
    {
      id: 'science',
      name: 'Science & Nature',
      description: 'Test your knowledge of biology, chemistry, physics, and nature',
      questionCount: 10
    },
    {
      id: 'history',
      name: 'World History',
      description: 'Journey through time with questions about historical events',
      questionCount: 10
    },
    {
      id: 'technology',
      name: 'Technology',
      description: 'Modern tech, programming, and digital innovation',
      questionCount: 10
    },
    {
      id: 'sports',
      name: 'Sports & Recreation',
      description: 'Athletic achievements, rules, and sporting history',
      questionCount: 10
    }
  ];

  private questions: Record<string, Question[]> = {
    science: [
      {
        id: 1,
        text: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation: "Au comes from the Latin word 'aurum' meaning gold.",
        difficulty: 'easy'
      },
      {
        id: 2,
        text: "Which planet is known as the 'Red Planet'?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        explanation: "Mars appears red due to iron oxide (rust) on its surface.",
        difficulty: 'easy'
      },
      {
        id: 3,
        text: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
        correctAnswer: 2,
        explanation: "Mitochondria generate most of the cell's ATP energy.",
        difficulty: 'medium'
      },
      {
        id: 4,
        text: "How many bones are in an adult human body?",
        options: ["196", "206", "216", "226"],
        correctAnswer: 1,
        explanation: "Adults have 206 bones, while babies are born with about 270.",
        difficulty: 'medium'
      },
      {
        id: 5,
        text: "What is the speed of light in a vacuum?",
        options: ["299,792,458 m/s", "300,000,000 m/s", "186,282 m/s", "299,000,000 m/s"],
        correctAnswer: 0,
        explanation: "This is one of the fundamental constants of physics.",
        difficulty: 'hard'
      },
      {
        id: 6,
        text: "Which gas makes up about 78% of Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        correctAnswer: 2,
        explanation: "Nitrogen is the most abundant gas in our atmosphere.",
        difficulty: 'easy'
      },
      {
        id: 7,
        text: "What is the hardest natural substance on Earth?",
        options: ["Diamond", "Quartz", "Titanium", "Graphite"],
        correctAnswer: 0,
        explanation: "Diamond rates 10 on the Mohs hardness scale.",
        difficulty: 'easy'
      },
      {
        id: 8,
        text: "How many chambers does a human heart have?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
        explanation: "The heart has four chambers: two atria and two ventricles.",
        difficulty: 'easy'
      },
      {
        id: 9,
        text: "What is the smallest unit of matter?",
        options: ["Molecule", "Atom", "Proton", "Electron"],
        correctAnswer: 1,
        explanation: "Atoms are the basic building blocks of all matter.",
        difficulty: 'medium'
      },
      {
        id: 10,
        text: "Which scientist developed the theory of evolution?",
        options: ["Isaac Newton", "Albert Einstein", "Charles Darwin", "Galileo Galilei"],
        correctAnswer: 2,
        explanation: "Darwin's 'On the Origin of Species' revolutionized biology.",
        difficulty: 'medium'
      }
    ],
    history: [
      {
        id: 11,
        text: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correctAnswer: 1,
        explanation: "WWII ended in 1945 with Japan's surrender in September.",
        difficulty: 'easy'
      },
      {
        id: 12,
        text: "Who was the first person to walk on the moon?",
        options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Yuri Gagarin"],
        correctAnswer: 1,
        explanation: "Neil Armstrong stepped onto the moon on July 20, 1969.",
        difficulty: 'easy'
      },
      {
        id: 13,
        text: "Which ancient wonder of the world was located in Alexandria?",
        options: ["Hanging Gardens", "Colossus of Rhodes", "Lighthouse of Alexandria", "Temple of Artemis"],
        correctAnswer: 2,
        explanation: "The Lighthouse of Alexandria was one of the tallest structures of the ancient world.",
        difficulty: 'medium'
      },
      {
        id: 14,
        text: "When did Nigeria gain independence from Britain?",
        options: ["1956", "1960", "1963", "1970"],
        correctAnswer: 1,
        explanation: "Nigeria became independent on October 1, 1960.",
        difficulty: 'easy'
      },
      {
        id: 15,
        text: "Who was the first President of Nigeria?",
        options: ["Nnamdi Azikiwe", "Obafemi Awolowo", "Ahmadu Bello", "Yakubu Gowon"],
        correctAnswer: 0,
        explanation: "Nnamdi Azikiwe became Nigeria's first President in 1963.",
        difficulty: 'easy'
      },
      {
        id: 16,
        text: "What is the capital of Nigeria?",
        options: ["Lagos", "Abuja", "Port Harcourt", "Kano"],
        correctAnswer: 1,
        explanation: "Abuja became the capital of Nigeria in 1991, replacing Lagos.",
        difficulty: 'easy'
      },
        {
            id: 17,
            text: "Who was the first woman to fly solo across the Atlantic Ocean?",
            options: ["Amelia Earhart", "Bessie Coleman", "Harriet Quimby", "Jacqueline Cochran"],
            correctAnswer: 0,
            explanation: "Amelia Earhart achieved this feat in 1932.",
            difficulty: 'medium'
        },
        {
            id: 18,
            text: "What is the largest planet in our solar system?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            correctAnswer: 2,
            explanation: "Jupiter is the largest planet in our solar system.",
            difficulty: 'easy'
        },
        {
            id: 19,
            text: "How old is Nigeria since gaining independence in 1960?",
            options: ["60 years", "61 years", "62 years", "63 years"],
            correctAnswer: 2,
            explanation: "Nigeria gained independence on October 1, 1960, making it 62 years old as of 2022.",
            difficulty: 'easy'
        },
    {
        id: 20,
        text: "The place where the two major rivers of Nigeria, the Niger and Benue, meet is called what?",
        options: ["Port Harcourt", "Lokoja", "Kano", "Abuja"],
        correctAnswer: 1,
        explanation: "The confluence of the Niger and Benue rivers is located in Lokoja.",
        difficulty: 'medium'
    }
    ],
    technology: [
      {
        id: 21,
        text: "What does 'HTTP' stand for?",
        options: ["HyperText Transfer Protocol", "High Tech Transfer Process", "Home Tool Transfer Protocol", "HyperText Technical Process"],
        correctAnswer: 0,
        explanation: "HTTP is the foundation of data communication on the web.",
        difficulty: 'easy'
      },
      {
        id: 22,
        text: "Who founded Microsoft?",
        options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"],
        correctAnswer: 1,
        explanation: "Bill Gates co-founded Microsoft with Paul Allen in 1975.",
        difficulty: 'easy'
      },
      {
        id: 23,
        text: "What does 'AI' stand for?",
        options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Algorithmic Interface"],
        correctAnswer: 1,
        explanation: "AI refers to machine intelligence that simulates human thinking.",
        difficulty: 'easy'
      },
      {
        id: 24,
        text: "Which programming language is known for its use in web development?",
        options: ["Python", "JavaScript", "C++", "Assembly"],
        correctAnswer: 1,
        explanation: "JavaScript is essential for interactive web development.",
        difficulty: 'easy'
      },
      {
        id: 25,
        text: "What does 'GPU' stand for?",
        options: ["General Processing Unit", "Graphics Processing Unit", "Global Processing Unit", "Gaming Processing Unit"],
        correctAnswer: 1,
        explanation: "GPUs are specialized for rendering graphics and parallel processing.",
        difficulty: 'medium'
      },
      {
        id: 26,
        text: "Which company developed the iPhone?",
        options: ["Samsung", "Google", "Apple", "Microsoft"],
        correctAnswer: 2,
        explanation: "Apple introduced the iPhone in 2007, revolutionizing smartphones.",
        difficulty: 'easy'
      },
      {
        id: 27,
        text: "What is the binary representation of the decimal number 8?",
        options: ["1000", "1001", "1010", "1100"],
        correctAnswer: 0,
        explanation: "In binary, 8 is represented as 1000 (1×2³ + 0×2² + 0×2¹ + 0×2⁰).",
        difficulty: 'medium'
      },
      {
        id: 28,
        text: "Which protocol is used for sending emails?",
        options: ["HTTP", "FTP", "SMTP", "TCP"],
        correctAnswer: 2,
        explanation: "SMTP (Simple Mail Transfer Protocol) is used for email transmission.",
        difficulty: 'medium'
      },
      {
        id: 29,
        text: "What does 'SQL' stand for?",
        options: ["Standard Query Language", "Structured Query Language", "Simple Query Language", "System Query Language"],
        correctAnswer: 1,
        explanation: "SQL is used for managing and querying relational databases.",
        difficulty: 'medium'
      },
      {
        id: 30,
        text: "Which storage unit is larger?",
        options: ["Gigabyte", "Terabyte", "Megabyte", "Kilobyte"],
        correctAnswer: 1,
        explanation: "A terabyte equals 1,024 gigabytes.",
        difficulty: 'easy'
      }
    ],
    sports: [
      {
        id: 31,
        text: "How many players are on a basketball team during play?",
        options: ["4", "5", "6", "7"],
        correctAnswer: 1,
        explanation: "Each basketball team has 5 players on the court at a time.",
        difficulty: 'easy'
      },
      {
        id: 32,
        text: "In which year did Nigeria win Olympic gold in football (soccer)?",
        options: ["1992", "1996", "2000", "2004"],
        correctAnswer: 1,
        explanation: "Nigeria's Dream Team won gold at the Atlanta Olympics in 1996.",
        difficulty: 'medium'
      },
      {
        id: 33,
        text: "How often are the Summer Olympics held?",
        options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"],
        correctAnswer: 2,
        explanation: "The Summer Olympics occur every four years.",
        difficulty: 'easy'
      },
      {
        id: 34,
        text: "Which country has won the most FIFA World Cups?",
        options: ["Germany", "Argentina", "Brazil", "Italy"],
        correctAnswer: 2,
        explanation: "Brazil has won the FIFA World Cup 5 times.",
        difficulty: 'medium'
      },
      {
        id: 35,
        text: "Which Nigerian won the 1993 African Footballer of the Year?",
        options: ["Jay-Jay Okocha", "Nwankwo Kanu", "Rashidi Yekini", "Sunday Oliseh"],
        correctAnswer: 2,
        explanation: "Rashidi Yekini was Africa’s top footballer in 1993.",
        difficulty: 'medium'
      },
      {
        id: 36,
        text: "Which country in Africa hosted the first FIFA World Cup?",
        options: ["South Africa", "Egypt", "Nigeria", "Ghana"],
        correctAnswer: 0,
        explanation: "South Africa hosted the first FIFA World Cup on the African continent in 2010.",
        difficulty: 'medium'
      },
      {
        id: 37,
        text: "Which sport is known as 'America's pastime'?",
        options: ["Football", "Basketball", "Baseball", "Hockey"],
        correctAnswer: 2,
        explanation: "Baseball has been called America's pastime since the 19th century.",
        difficulty: 'easy'
      },
      {
        id: 38,
        text: "In which sport would you see a 'hat trick'?",
        options: ["Baseball", "Soccer", "Cricket", "All of the above"],
        correctAnswer: 3,
        explanation: "A hat trick (three consecutive achievements) occurs in many sports.",
        difficulty: 'medium'
      },
      {
        id: 39,
        text: "Who won the 2022 FIFA World Cup?",
        options: ["Brazil", "France", "Argentina", "Germany"],
        correctAnswer: 2,
        explanation: "Argentina won the 2022 FIFA World Cup, defeating France in the final.",
        difficulty: 'medium'
      },
      {
        id: 40,
        text: "Who is considered the GOAT of football?",
        options: ["Pelé", "Diego Maradona", "Lionel Messi", "Cristiano Ronaldo"],
        correctAnswer: 2,
        explanation: "Lionel Messi is often regarded as the greatest football player of all time.",
        difficulty: 'medium'
      }
    ]
  };

  async getCategories(): Promise<QuizCategory[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.categories];
  }

  async getQuestionsByCategory(categoryId: string): Promise<Question[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const questions = this.questions[categoryId];
    if (!questions) {
      throw new Error(`Category ${categoryId} not found`);
    }
    
    // Return a shuffled copy of questions
    return [...questions].sort(() => Math.random() - 0.5);
  }

  saveScore(entry: LeaderboardEntry): void {
    try {
      const existingScores = this.getLeaderboardFromStorage();
      existingScores.push(entry);
      
      // Sort by score percentage, then by total score
      existingScores.sort((a, b) => {
        const aPercentage = (a.score / a.totalQuestions) * 100;
        const bPercentage = (b.score / b.totalQuestions) * 100;
        
        if (bPercentage !== aPercentage) {
          return bPercentage - aPercentage; // Higher percentage first
        }
        return b.score - a.score; // Higher raw score first if percentages are equal
      });
      
      // Keep only top 10 scores
      const topScores = existingScores.slice(0, 10);
      
      localStorage.setItem('quizLeaderboard', JSON.stringify(topScores));
      console.log('Score saved successfully:', entry);
    } catch (error) {
      console.error('Failed to save score:', error);
    }
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.getLeaderboardFromStorage();
  }

  private getLeaderboardFromStorage(): LeaderboardEntry[] {
    try {
      const stored = localStorage.getItem('quizLeaderboard');
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      // Convert timestamp strings back to Date objects
      return parsed.map((entry: Omit<LeaderboardEntry, 'timestamp'> & { timestamp: string }) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      return [];
    }
  }

  clearLeaderboard(): void {
    localStorage.removeItem('quizLeaderboard');
  }
}

export const quizService = new QuizService();
