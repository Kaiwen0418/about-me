const asset = (path) => `${process.env.PUBLIC_URL}${path}`;

export const projData = {
  3: {
    name: "Object Echo",
    description: "A 3D device museum project focused on presenting hardware artifacts through an interactive web experience. Built as a modern repository-backed showcase for exploring device history and digital preservation.",
    brief: "3D Device Museum",
    url: {
      github: 'https://github.com/Kaiwen0418/object-echo',
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
      ["Language", "JavaScript"],
      ["Platform", "Web-based"],
      ["Front-end", "Interactive 3D UI"],
      ["Back-end", "Repository-hosted app"],
    ],
    projectHighlights: "Presents a curated hardware collection as a 3D museum experience, shifting the project focus from device security to interactive digital exhibition.",
    emoji: "🔒",
    stackIcons: [asset("/icon/python.png"), asset("/icon/js.png"), asset("/icon/node.png"), asset("/icon/vue.png")]
  },
  2: {
    name: "Benchmark Echo",
    description: "An agent benchmarking project for evaluating and comparing autonomous system performance across tasks. It reframes the previous factory scheduling entry around benchmarking workflows, measurements, and iteration speed.",
    brief: "Agent Benchmarking Platform",
    url: {
      github: 'https://github.com/Kaiwen0418/benchmark-echo',
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
      ["Front-end", "Benchmark dashboards"],
      ["Back-end", "Evaluation pipelines"],
    ],
    projectHighlights: "Centers on measuring agent quality and execution behavior, replacing the earlier CNC scheduling workflow with benchmarking and analysis tooling.",
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
  5: {
    name: "Prediction Market Intelligence Dashboard",
    description: "A market intelligence dashboard for tracking and interpreting prediction market activity. The project focuses on surfacing live market signals, comparative views, and decision-oriented monitoring in a compact web interface.",
    brief: "Prediction Market Dashboard",
    url: {
      github: 'https://github.com/Kaiwen0418/Prediction-Market-Intelligence-Dashboard',
      site: ''
    },
    images: {
      gif: asset("/images/proj_gif/cnc.gif"),
      static: asset("/images/proj_static/cnc.png"),
      overview: asset("/images/proj_detail/cnc_data.png"),
    },
    demoImage: asset("/images/demo/home/cnc-system.jpg"),
    demoImageFallback: "https://images.unsplash.com/photo-1642790551116-18e150f248e3?auto=format&fit=crop&w=400&q=80",
    details: [
      ["Language", "Python, JavaScript"],
      ["Platform", "Web-based"],
      ["Front-end", "Dashboard UI"],
      ["Back-end", "Market data analysis pipeline"],
    ],
    projectHighlights: "Turns prediction market information into an operational dashboard, making pricing shifts and signal aggregation easier to inspect at a glance.",
    emoji: "📈",
    stackIcons: [asset("/icon/python.png"), asset("/icon/js.png"), asset("/icon/node.png"), asset("/icon/react.png")]
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
