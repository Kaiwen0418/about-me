const asset = (path) => `${process.env.PUBLIC_URL}${path}`;

export const projData = {
  3: {
    name: "Embedded Security System",
    description: "A sophisticated security system leveraging facial recognition technology to enhance security measures. Express.js, Vue.JS, MongoDB - Deployed on Raspberry Pi with real-time facial recognition and web interface controls.",
    brief: "Face Recognition Embedded Security System",
    url: {
      github: 'https://github.com/Kaiwen0418/Face-Recognition-Embedded-Security-System',
      site: ''
    },
    images: {
      gif: asset("/images/proj_gif/camera.gif"),
      static: asset("/images/proj_static/camera.png"),
      overview: asset("/images/proj_detail/cam.jpg"),
    },
    demoImage: asset("/images/demo/home/embedded-security.jpg"),
    demoImageFallback: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80",
    details: [
      ["Language", "Python, JavaScript"],
      ["Platform", "Raspberry Pi/Web-based/Desktop"],
      ["Front-end", "Vue.JS, Flask"],
      ["Back-end", "Express.js, MongoDB, NumPy"],
    ],
    projectHighlights: "Designed and developed user interfaces for device control, visitor statistics, and live video streaming, enhancing security measures through facial recognition technology.",
    emoji: "🔒",
    stackIcons: [asset("/icon/python.png"), asset("/icon/js.png"), asset("/icon/node.png"), asset("/icon/vue.png")]
  },
  2: {
    name: "CNC Scheduling System",
    description: "A state-of-the-art scheduling system that optimizes factory operations through advanced data analysis.NumPy, Flask, React.JS - Developed for CloudNC Ltd to process real-time factory data and manage workflow.",
    brief: "CNC Factory Scheduling System",
    url: {
      github: '',
      site: ''
    },
    images: {
      gif: asset("/images/proj_gif/cnc.gif"),
      static: asset("/images/proj_static/cnc.png"),
      overview: asset("/images/proj_detail/cnc_data.png"),
    },
    demoImage: asset("/images/demo/home/cnc-system.jpg"),
    demoImageFallback: "https://images.unsplash.com/photo-1565439399-2b0e50f38b55?auto=format&fit=crop&w=400&q=80",
    details: [
      ["Language", "Python, JavaScript"],
      ["Platform", "Web-based"],
      ["Front-end", "React.JS, Dashboard.py"],
      ["Back-end", "Flask, Express.js, NumPy"],
    ],
    projectHighlights: "Spearheaded the development of a workflow analysis tool that features real-time data processing and a user-friendly dashboard for efficient factory scheduling.",
    emoji: "🏭",
    stackIcons: [asset("/icon/python.png"), asset("/icon/js.png"), asset("/icon/node.png"), asset("/icon/react.png")]
  },
  1: {
    name: "Circuit Simulator",
    description: "A re-implementation of the Imperial College EE department's circuit simulator, enhanced for modern computing environments. F#, Avalonia.UI - Reimplemented on the .NET platform with functional programming and MVU UI design.",
    brief: "Circuit Simulator Re-Implementation",
    url: {
      github: 'https://github.com/Kaiwen0418/Issie-Avalonia',
      site: ''
    },
    images: {
      gif: asset("/images/proj_gif/circuit.gif"),
      static: asset("/images/proj_static/circuit.png"),
      overview: asset("/images/proj_detail/issie_drag.gif"),
    },
    demoImage: asset("/images/demo/home/circuit-simulator.jpg"),
    demoImageFallback: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    details: [
      ["Language", "F#"],
      ["Platform", "Desktop/Cross-platform"],
      ["Front-end", "Avalonia.UI"],
      ["Back-end", "N/A"],
    ],
    projectHighlights: "Achieved a 40% improvement in RAM consumption, demonstrating significant performance optimizations and modernizing the application for current technology standards.",
    emoji: "⚡",
    stackIcons: [asset("/icon/fsharp.png")]
  },
  4: {
    name: "Math to Braille OCR",
    description: "An OCR system that translates printed mathematical content into Braille, making math education more accessible.",
    brief: "Utilizes OCR to convert math equations into Braille",
    url: {
      github: '',
      site: 'https://simpletex.cn/horizon_project'
    },
    images: {
      gif: asset("/images/proj_gif/braille.gif"),
      static: asset("/images/proj_static/braille.png"),
      overview: asset("/images/proj_detail/braille_page.png"),
    },
    demoImage: asset("/images/demo/home/math-braille.jpg"),
    demoImageFallback: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80",
    details: [
      ["Language", "Python, JavaScript"],
      ["Platform", "Web-based"],
      ["Front-end", "Vue.JS"],
      ["Back-end", "Flask, Express.js, Tesseract OCR engine"],
    ],
    projectHighlights: "Empowers visually impaired students by providing them with the tools necessary to study complex mathematical content independently.",
    emoji: "🧮",
    stackIcons: [asset("/icon/python.png"), asset("/icon/js.png"), asset("/icon/node.png"), asset("/icon/vue.png")]
  },
  // Additional projects can be added here following the same structure.
};

export const iconList = [
  asset("/icon/c++.jpg"),
  asset("/icon/js.png"),
  asset("/icon/node.png"),
  asset("/icon/python.png"),
  asset("/icon/react.png"),
  asset("/icon/vue.png"),
  asset("/icon/fsharp.png"),
  asset("/icon/git.jpg")
]

export const artData = {
  'hopper' : {
    name: "Edward Hopper",
    images: {
      base: asset("/images/art_pop/HOPPER.jpg"),
      front: asset("/images/art_pop/HOPPER_front.png"),
    },
    Intro:
      "Edward Hopper, an American painter, is celebrated for his adept use of light, shadow, and architectural form to capture the essence of American life and its landscapes. His paintings often depict scenes of isolation within urban settings, which resonate with me personally because they evoke an emotional response through seemingly simple, everyday scenes. What draws me most to Hopper’s work is how he captures moments of solitude that suggest a deeper significance, inviting viewers to reflect on their own moments of loneliness and introspection."
  },
};

export const morePageData = {
  1 : {
    name: "ME",
    images: asset("/images/more_page/me.png"),
    intro:
      "Active and passionate developer, wild interest in tech, deisgn and art, click to know more about my experience"
  },
  2 : {
    name: "DESIGN",
    images: asset("/images/more_page/design.png"),
    intro:
      "Painting and designing since high school, welcome to have a look of logos and UIs I made!"
  },
  3 : {
    name: "ART",
    images: asset("/images/more_page/monet.png"),
    intro:
      "Simply sharing artworks and pop culture I love, also showcasing some awsome css animation and design~"
  },

};


export const personalProfile = {
  1: {
    name: "Kaiwen Liu",
    alias: "Full-stack Dev",
    images: {
      avatar: asset("/images/pixel_me.png")
    },
    details: [
      ["Edu:", "Imperial College London"],
      ["Degree:", "EIE MEng"],
      ["Achievements:", "Survivor of 48-Hour Hackathons, Conqueror of Cascade Mountains"],
    ],
    skills: [
      ["JavaScript Mastery", "Level Expert"],
      ["Puzzle Solving", "Level Pro"],
      ["Code Wizardry", "Level Mage"],
      ["Team Motivation", "Level Captain"],
      ["Quick Learning", "Level Adept"]
    ],
    inventory: [
      ["Laptop", "Of Infinite Coding"],
      ["Elixir", "Of Espresso Shots"],
      ["Scroll", "Of Swift Deadlines"],
      ["Cloak", "Of Multitasking"]
    ],
    achievements: [
      "Survivor of 48-Hour Hackathons",
      "Conqueror of Cascade Mountains",
      "Hero of Hundred Projects",
      "Guardian of Game Nights"
    ],
    bio: [
      ["condition", "Mint Condition"],
      ["parts", "Arms for hugging, legs for marathons, and a head full of ideas"],
      ["pH", "9 (Alkaline, because I’m always up-beat!)"],
      ["ratio", "3 jokes per serious moment"],
      ["temp", "Warm enough to melt ice cream (180°F)"],
      ["extract time", "1 hour (best when steeped in a good book)"],
      ["dye time", "1 hour (or until vibrant)"]
    ]
  }
};
