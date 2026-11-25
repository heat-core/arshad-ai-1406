const CORE_CACHE = "arshad-1406-core-v1";
const PDF_CACHE = "arshad-1406-pdfs-v1";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./manifest.webmanifest",
  "./app/styles.css",
  "./app/app.js",
  "./app/data/curriculum_1406.js",
  "./app/data/curriculum_1406.json",
  "./assets/fonts/Vazirmatn-Regular.woff2",
  "./assets/fonts/Vazirmatn-Medium.woff2",
  "./assets/fonts/Vazirmatn-Bold.woff2",
  "./assets/fonts/Vazirmatn-ExtraBold.woff2",
  "./assets/icons/icon-180.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png"
];

const MARKDOWN_ASSETS = [
  "./00_Roadmap_&_Azad_Graduation/01_Azad_University_Checklist.md",
  "./00_Roadmap_&_Azad_Graduation/02_5Month_Study_Schedule.md",
  "./00_Roadmap_&_Azad_Graduation/03_Official_1406_Changes_&_Share_Analysis.md",
  "./01_Specialized_Courses_Coef4/01_Artificial_Intelligence_Coef4/00_Syllabus_&_Resources.md",
  "./01_Specialized_Courses_Coef4/01_Artificial_Intelligence_Coef4/Ch01_Uninformed_&_Informed_Search.md",
  "./01_Specialized_Courses_Coef4/01_Artificial_Intelligence_Coef4/Ch02_CSP_&_Local_Search.md",
  "./01_Specialized_Courses_Coef4/01_Artificial_Intelligence_Coef4/Ch03_Adversarial_Search_&_Games.md",
  "./01_Specialized_Courses_Coef4/01_Artificial_Intelligence_Coef4/Ch04_Propositional_&_First_Order_Logic.md",
  "./01_Specialized_Courses_Coef4/01_Artificial_Intelligence_Coef4/Ch05_Uncertainty_Bayesian_&_ML_Basics.md",
  "./01_Specialized_Courses_Coef4/02_Data_Structures_Coef4/00_Syllabus_&_Resources.md",
  "./01_Specialized_Courses_Coef4/02_Data_Structures_Coef4/Ch01_Complexity_&_Recurrences.md",
  "./01_Specialized_Courses_Coef4/02_Data_Structures_Coef4/Ch02_Arrays_Stacks_Queues_LinkedLists.md",
  "./01_Specialized_Courses_Coef4/02_Data_Structures_Coef4/Ch03_Binary_Trees_BST_AVL.md",
  "./01_Specialized_Courses_Coef4/02_Data_Structures_Coef4/Ch04_Heaps_&_Hashing.md",
  "./01_Specialized_Courses_Coef4/02_Data_Structures_Coef4/Ch05_Graphs_&_Sorting.md",
  "./01_Specialized_Courses_Coef4/03_Algorithm_Design_Coef4/00_Syllabus_&_Resources.md",
  "./01_Specialized_Courses_Coef4/03_Algorithm_Design_Coef4/Ch01_Divide_and_Conquer.md",
  "./01_Specialized_Courses_Coef4/03_Algorithm_Design_Coef4/Ch02_Greedy_&_MST.md",
  "./01_Specialized_Courses_Coef4/03_Algorithm_Design_Coef4/Ch03_Dynamic_Programming.md",
  "./01_Specialized_Courses_Coef4/03_Algorithm_Design_Coef4/Ch04_Shortest_Paths_&_NP_Completeness.md",
  "./01_Specialized_Courses_Coef4/04_Computer_Fundamentals_&_Programming_Coef4/00_Syllabus_&_Resources.md",
  "./01_Specialized_Courses_Coef4/04_Computer_Fundamentals_&_Programming_Coef4/Ch01_C_Basics_Operators_&_Bitwise.md",
  "./01_Specialized_Courses_Coef4/04_Computer_Fundamentals_&_Programming_Coef4/Ch02_Control_Flow_Functions_&_Recursion.md",
  "./01_Specialized_Courses_Coef4/04_Computer_Fundamentals_&_Programming_Coef4/Ch03_Pointers_Arrays_Strings_&_Structs.md",
  "./01_Specialized_Courses_Coef4/05_Operating_Systems_Coef4/00_Syllabus_&_Resources.md",
  "./01_Specialized_Courses_Coef4/05_Operating_Systems_Coef4/Ch01_Processes_Threads_&_CPU_Scheduling.md",
  "./01_Specialized_Courses_Coef4/05_Operating_Systems_Coef4/Ch02_Synchronization_&_Semaphores.md",
  "./01_Specialized_Courses_Coef4/05_Operating_Systems_Coef4/Ch03_Deadlocks.md",
  "./01_Specialized_Courses_Coef4/05_Operating_Systems_Coef4/Ch04_Memory_Management_&_Virtual_Memory.md",
  "./01_Specialized_Courses_Coef4/05_Operating_Systems_Coef4/Ch05_Disk_Scheduling_&_File_Systems.md",
  "./01_Specialized_Courses_Coef4/06_Theory_of_Languages_&_Automata_Coef4/00_Syllabus_&_Resources.md",
  "./01_Specialized_Courses_Coef4/06_Theory_of_Languages_&_Automata_Coef4/Ch01_Finite_Automata_&_Regular_Languages.md",
  "./01_Specialized_Courses_Coef4/06_Theory_of_Languages_&_Automata_Coef4/Ch02_Context_Free_Grammars_&_PDA.md",
  "./01_Specialized_Courses_Coef4/06_Theory_of_Languages_&_Automata_Coef4/Ch03_Turing_Machines_&_Decidability.md",
  "./01_Specialized_Courses_Coef4/07_Logic_Circuits_Coef4/00_Syllabus_&_Resources.md",
  "./01_Specialized_Courses_Coef4/07_Logic_Circuits_Coef4/Ch01_Boolean_Combinational_&_Sequential_Circuits.md",
  "./01_Specialized_Courses_Coef4/07_Logic_Circuits_Coef4/Ch02_Timing_Analysis_Hazards_&_HDL_Basics.md",
  "./01_Specialized_Courses_Coef4/08_Computer_Architecture_Coef4/00_Selective_HighYield_Guide.md",
  "./01_Specialized_Courses_Coef4/08_Computer_Architecture_Coef4/00_Syllabus_&_Resources.md",
  "./01_Specialized_Courses_Coef4/08_Computer_Architecture_Coef4/Ch02_RTL_Control_Unit_&_Booth_Multiplication.md",
  "./02_Mathematics_Courses_Coef2/01_Discrete_Mathematics_Coef2/00_Syllabus_&_Resources.md",
  "./02_Mathematics_Courses_Coef2/01_Discrete_Mathematics_Coef2/Ch01_Logic_Sets_&_Relations.md",
  "./02_Mathematics_Courses_Coef2/01_Discrete_Mathematics_Coef2/Ch02_Combinatorics_&_Graph_Theory.md",
  "./02_Mathematics_Courses_Coef2/02_Probability_&_Statistics_Coef2/00_Syllabus_&_Resources.md",
  "./02_Mathematics_Courses_Coef2/02_Probability_&_Statistics_Coef2/Ch01_Probability_Random_Variables_&_Distributions.md",
  "./02_Mathematics_Courses_Coef2/02_Probability_&_Statistics_Coef2/Ch02_Joint_Distributions_CLT_&_Statistical_Inference.md",
  "./02_Mathematics_Courses_Coef2/03_Linear_Algebra_Coef2/00_Syllabus_&_Resources.md",
  "./02_Mathematics_Courses_Coef2/03_Linear_Algebra_Coef2/Ch01_Matrices_Determinants_&_Linear_Systems.md",
  "./02_Mathematics_Courses_Coef2/03_Linear_Algebra_Coef2/Ch02_Vector_Spaces_Rank_Nullity_&_Transformations.md",
  "./02_Mathematics_Courses_Coef2/03_Linear_Algebra_Coef2/Ch03_Eigenvalues_Diagonalization_&_Inner_Product.md",
  "./03_English_Course_Coef1/00_English_Reading_&_Vocab_Guide.md",
  "./03_English_Course_Coef1/Ch01_Computer_Science_High_Frequency_Vocabulary.md",
  "./04_Past_Exams_&_Tests/00_Past_Exams_Index_&_Analysis_Guide.md",
  "./04_Past_Exams_&_Tests/01_High_Frequency_Topic_Tests_With_Solutions.md",
  "./04_Past_Exams_&_Tests/02_Direct_Download_Links_Archive.md",
  "./README.md",
  "./weak1/00_START_HERE_Week1_Master_Plan.md",
  "./weak1/01_Data_Structures_Coef4/01_Syllabus_&_Resources.md",
  "./weak1/01_Data_Structures_Coef4/02_Ch01_Complexity_&_Recurrences.md",
  "./weak1/01_Data_Structures_Coef4/03_Ch02_Arrays_Stacks_Queues_LinkedLists.md",
  "./weak1/02_C_Programming_Coef4/01_Syllabus_&_Resources.md",
  "./weak1/02_C_Programming_Coef4/02_Ch01_C_Basics_Operators_&_Bitwise.md",
  "./weak1/02_C_Programming_Coef4/03_Ch02_Control_Flow_Functions_&_Recursion.md",
  "./weak1/03_Discrete_Mathematics_Coef2/01_Syllabus_&_Resources.md",
  "./weak1/03_Discrete_Mathematics_Coef2/02_Ch01_Logic_Sets_&_Relations.md",
  "./weak1/04_English_Week1_Coef1/01_Konkoor_English_Reading_&_Vocab_Guide.md",
  "./weak1/04_English_Week1_Coef1/02_Konkoor_Ch01_CS_High_Frequency_Vocab.md",
  "./weak1/04_English_Week1_Coef1/03_Migration_English_Week_01_Days_01_to_07.md",
  "./weak1/05_Azad_Admin_&_Side_Tracks/01_Azad_University_Checklist.md",
  "./weak1/05_Azad_Admin_&_Side_Tracks/02_Tanbour_Daily_45min_Checklist.md",
  "./weak1/05_Azad_Admin_&_Side_Tracks/03_Konkoor_1406_Sample_Tests.md"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CORE_CACHE);
    const all = CORE_ASSETS.concat(MARKDOWN_ASSETS);
    await Promise.allSettled(
      all.map((url) =>
        cache.add(new Request(encodeURI(url), { cache: "reload" }))
      )
    );
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => k !== CORE_CACHE && k !== PDF_CACHE)
        .map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Never cache live progress API; fail cleanly when offline
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(req).catch(() =>
        new Response(JSON.stringify({ offline: true }), {
          status: 503,
          headers: { "Content-Type": "application/json; charset=utf-8" }
        })
      )
    );
    return;
  }

  // On-demand caching for PDFs (too large for upfront precache on iOS)
  if (url.pathname.toLowerCase().endsWith(".pdf")) {
    event.respondWith((async () => {
      const cache = await caches.open(PDF_CACHE);
      const cached = await cache.match(req);
      if (cached) return cached;
      const res = await fetch(req);
      if (res && res.ok) {
        cache.put(req, res.clone());
      }
      return res;
    })());
    return;
  }

  // Stale-while-revalidate for core app & Markdown lessons
  event.respondWith((async () => {
    const cache = await caches.open(CORE_CACHE);
    const cached = await cache.match(req, { ignoreSearch: url.pathname.endsWith(".md") });
    const fetchPromise = fetch(req)
      .then((res) => {
        if (res && res.ok) {
          cache.put(req, res.clone());
        }
        return res;
      })
      .catch(() => null);

    if (cached) {
      event.waitUntil(fetchPromise);
      return cached;
    }

    const netRes = await fetchPromise;
    if (netRes) return netRes;

    if (req.mode === "navigate") {
      const fallback = await cache.match("./dashboard.html");
      if (fallback) return fallback;
    }

    return new Response("Offline", { status: 504, statusText: "Offline" });
  })());
});
