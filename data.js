/* ==================================================================
   Course data — Cambridge International AS & A Level Chemistry 9701.
   Topic and sub-topic headings follow Cambridge's published syllabus
   for exams in 2025, 2026 and 2027 (topics unchanged for 2028–2030).
   The short "key ideas" under each sub-topic are summaries written
   for this site, not Cambridge's wording.
   Relative atomic masses are standard atomic weights to 1 d.p.
   ================================================================== */
(function () {
  "use strict";

  // Text markup used below:  ~x~ = subscript,  ^x^ = superscript
  var T = function (n, title, level, branch, subs) {
    return { n: n, title: title, level: level, branch: branch, subs: subs.map(function (s) {
      return { id: s[0], title: s[1], keys: s[2] };
    }) };
  };

  var TOPICS = [
    // ---------------- AS LEVEL ----------------
    T(1, "Atomic structure", "AS", "phys", [
      ["1.1", "Particles in the atom and atomic radius", "Protons, neutrons, electrons · behaviour in an electric field · atomic and ionic radius trends"],
      ["1.2", "Isotopes", "Nucleon and proton number notation · same chemical, different physical properties"],
      ["1.3", "Electrons, energy levels and atomic orbitals", "Shells, sub-shells, orbitals · configurations from H to Kr · electrons in boxes · s and p orbital shapes · free radicals"],
      ["1.4", "Ionisation energy", "First and successive IEs · trends across a period and down a group · nuclear charge, shielding, spin-pair repulsion"]
    ]),
    T(2, "Atoms, molecules and stoichiometry", "AS", "phys", [
      ["2.1", "Relative masses of atoms and molecules", "Unified atomic mass unit · A~r~, relative isotopic mass, M~r~, relative formula mass"],
      ["2.2", "The mole and the Avogadro constant", "Defining and using the mole"],
      ["2.3", "Formulas", "Ionic formulas from charges · balanced and ionic equations · state symbols · empirical and molecular formulas · water of crystallisation"],
      ["2.4", "Reacting masses and volumes (of solutions and gases)", "Reacting masses and % yield · gas volumes · concentrations · limiting and excess reagent · significant figures"]
    ]),
    T(3, "Chemical bonding", "AS", "phys", [
      ["3.1", "Electronegativity and bonding", "Factors affecting electronegativity · trends · predicting ionic or covalent bonding from Pauling values"],
      ["3.2", "Ionic bonding", "Electrostatic attraction between ions · NaCl, MgO, CaF~2~"],
      ["3.3", "Metallic bonding", "Positive ions and delocalised electrons"],
      ["3.4", "Covalent bonding and coordinate (dative covalent) bonding", "Expanded octets · dative bonds in NH~4~^+^ and Al~2~Cl~6~ · σ and π bonds · sp, sp^2^, sp^3^ hybridisation · bond energy and bond length"],
      ["3.5", "Shapes of molecules", "VSEPR theory · linear to octahedral shapes and their bond angles"],
      ["3.6", "Intermolecular forces, electronegativity and bond properties", "Hydrogen bonding and water's anomalies · bond polarity and dipoles · id-id and pd-pd forces"],
      ["3.7", "Dot-and-cross diagrams", "Ionic, covalent and coordinate bonding, including expanded octets and odd-electron species"]
    ]),
    T(4, "States of matter", "AS", "phys", [
      ["4.1", "The gaseous state: ideal and real gases and pV = nRT", "Origin of gas pressure · ideal gas assumptions · pV = nRT, including finding M~r~"],
      ["4.2", "Bonding and structure", "Giant ionic, simple molecular, giant molecular and giant metallic lattices · linking structure to physical properties"]
    ]),
    T(5, "Chemical energetics", "AS", "phys", [
      ["5.1", "Enthalpy change, ΔH", "Exothermic and endothermic · reaction pathway diagrams · standard conditions · ΔH~r~, ΔH~f~, ΔH~c~, ΔH~neut~ · bond energies · q = mcΔT"],
      ["5.2", "Hess’s law", "Energy cycles · enthalpy changes that can’t be measured directly · bond energy data"]
    ]),
    T(6, "Electrochemistry", "AS", "phys", [
      ["6.1", "Redox processes: electron transfer and changes in oxidation number (oxidation state)", "Oxidation numbers · balancing with oxidation numbers · disproportionation · oxidising and reducing agents"]
    ]),
    T(7, "Equilibria", "AS", "phys", [
      ["7.1", "Chemical equilibria: reversible reactions, dynamic equilibrium", "Closed systems · Le Chatelier’s principle · K~c~ and K~p~ · mole fraction and partial pressure · Haber and Contact processes"],
      ["7.2", "Brønsted–Lowry theory of acids and bases", "Common acids and alkalis · strong vs weak · neutralisation and salts · pH titration curves · choosing indicators"]
    ]),
    T(8, "Reaction kinetics", "AS", "phys", [
      ["8.1", "Rate of reaction", "Frequency of collisions · effective and non-effective collisions · rate from experimental data"],
      ["8.2", "Effect of temperature on reaction rates and the concept of activation energy", "Activation energy · the Boltzmann distribution"],
      ["8.3", "Homogeneous and heterogeneous catalysts", "Alternative pathway of lower E~A~ · catalysis on a Boltzmann distribution · reaction pathway diagrams"]
    ]),
    T(9, "The Periodic Table: chemical periodicity", "AS", "inorg", [
      ["9.1", "Periodicity of physical properties of the elements in Period 3", "Atomic and ionic radius, melting point and conductivity across Period 3"],
      ["9.2", "Periodicity of chemical properties of the elements in Period 3", "Reactions with oxygen, chlorine and water · oxides and chlorides with water · acid/base and amphoteric behaviour"],
      ["9.3", "Chemical periodicity of other elements", "Predicting properties within a group · identifying unknown elements"]
    ]),
    T(10, "Group 2", "AS", "inorg", [
      ["10.1", "Similarities and trends in the properties of the Group 2 metals, magnesium to barium, and their compounds", "Reactions with oxygen, water and acids · thermal decomposition of nitrates and carbonates · solubility of hydroxides and sulfates"]
    ]),
    T(11, "Group 17", "AS", "inorg", [
      ["11.1", "Physical properties of the Group 17 elements", "Colours and volatility of Cl~2~, Br~2~, I~2~ · bond strength trend"],
      ["11.2", "The chemical properties of the halogen elements and the hydrogen halides", "Halogens as oxidising agents · reactions with hydrogen · thermal stability of HX"],
      ["11.3", "Some reactions of the halide ions", "Halides as reducing agents · silver nitrate then ammonia · concentrated sulfuric acid"],
      ["11.4", "The reactions of chlorine", "Disproportionation with cold and hot NaOH · chlorine in water purification"]
    ]),
    T(12, "Nitrogen and sulfur", "AS", "inorg", [
      ["12.1", "Nitrogen and sulfur", "Unreactivity of N~2~ · ammonia and the ammonium ion · oxides of nitrogen and catalytic converters · PAN and smog · acid rain"]
    ]),
    T(13, "An introduction to AS Level organic chemistry", "AS", "org", [
      ["13.1", "Formulas, functional groups and the naming of organic compounds", "General, structural, displayed and skeletal formulas · systematic naming up to six carbons"],
      ["13.2", "Characteristic organic reactions", "Homolytic and heterolytic fission · nucleophiles and electrophiles · reaction and mechanism types · curly arrows"],
      ["13.3", "Shapes of organic molecules; σ and π bonds", "Straight, branched and cyclic · sp, sp^2^, sp^3^ shapes · planar molecules"],
      ["13.4", "Isomerism: structural isomerism and stereoisomerism", "Chain, positional and functional group isomers · cis/trans · chiral centres and enantiomers"]
    ]),
    T(14, "Hydrocarbons", "AS", "org", [
      ["14.1", "Alkanes", "Hydrogenation and cracking · combustion · free-radical substitution mechanism · environmental effects"],
      ["14.2", "Alkenes", "Preparation · electrophilic addition and its mechanism · KMnO~4~ oxidation · bromine water test · Markovnikov addition"]
    ]),
    T(15, "Halogen compounds", "AS", "org", [
      ["15.1", "Halogenoalkanes", "Preparation · nucleophilic substitution with OH^–^, CN^–^, NH~3~ · elimination · S~N~1 and S~N~2 · C–X bond strength"]
    ]),
    T(16, "Hydroxy compounds", "AS", "org", [
      ["16.1", "Alcohols", "Preparation · oxidation by distillation or reflux · dehydration · esterification · tri-iodomethane test · acidity vs water"]
    ]),
    T(17, "Carbonyl compounds", "AS", "org", [
      ["17.1", "Aldehydes and ketones", "Reduction with NaBH~4~ or LiAlH~4~ · HCN addition and its mechanism · 2,4-DNPH · Fehling’s and Tollens’ tests"]
    ]),
    T(18, "Carboxylic acids and derivatives", "AS", "org", [
      ["18.1", "Carboxylic acids", "Preparation · reactions with metals, alkalis and carbonates · esterification · reduction by LiAlH~4~"],
      ["18.2", "Esters", "Condensation to form esters · acid and alkaline hydrolysis"]
    ]),
    T(19, "Nitrogen compounds", "AS", "org", [
      ["19.1", "Primary amines", "Halogenoalkane with ammonia in ethanol under pressure"],
      ["19.2", "Nitriles and hydroxynitriles", "Formation from halogenoalkanes and carbonyls · hydrolysis to carboxylic acids"]
    ]),
    T(20, "Polymerisation", "AS", "org", [
      ["20.1", "Addition polymerisation", "Poly(ethene) and PVC · repeat units and monomers · disposal problems"]
    ]),
    T(21, "Organic synthesis", "AS", "org", [
      ["21.1", "Organic synthesis", "Identifying functional groups · multi-step routes · analysing reagents and by-products"]
    ]),
    T(22, "Analytical techniques", "AS", "anal", [
      ["22.1", "Infrared spectroscopy", "Identifying functional groups from an IR spectrum"],
      ["22.2", "Mass spectrometry", "m/e values and isotopic abundance · A~r~ from a spectrum · molecular ion · fragments · [M+1] and [M+2] peaks"]
    ]),

    // ---------------- A LEVEL ----------------
    T(23, "Chemical energetics", "A", "phys", [
      ["23.1", "Lattice energy and Born–Haber cycles", "Atomisation · lattice energy · electron affinity trends · constructing and calculating Born–Haber cycles"],
      ["23.2", "Enthalpies of solution and hydration", "ΔH~sol~ and ΔH~hyd~ · energy cycles with lattice energy · effect of charge and radius"],
      ["23.3", "Entropy change, ΔS", "Meaning of entropy · predicting the sign of ΔS · calculating ΔS⦵ from standard entropies"],
      ["23.4", "Gibbs free energy change, ΔG", "ΔG = ΔH – TΔS · feasibility · effect of temperature"]
    ]),
    T(24, "Electrochemistry", "A", "phys", [
      ["24.1", "Electrolysis", "Predicting products · F = Le · Q = It · mass and volume liberated · finding the Avogadro constant"],
      ["24.2", "Standard electrode potentials, standard cell potentials and the Nernst equation", "Standard hydrogen electrode · measuring E values · cell potentials and feasibility · Nernst equation · ΔG = –nEF"]
    ]),
    T(25, "Equilibria", "A", "phys", [
      ["25.1", "Acids and bases", "Conjugate pairs · pH, K~a~, pK~a~, K~w~ · buffers and blood pH · K~sp~ and the common ion effect"],
      ["25.2", "Partition coefficients", "Meaning and calculation of K~pc~ · effect of polarity"]
    ]),
    T(26, "Reaction kinetics", "A", "phys", [
      ["26.1", "Simple rate equations, orders of reaction and rate constants", "Orders 0, 1, 2 · initial rates and half-life methods · k = 0.693/t~½~ · rate-determining step and mechanisms"],
      ["26.2", "Homogeneous and heterogeneous catalysts", "Adsorption and desorption · iron in the Haber process · catalytic converters · NO~x~ with SO~2~ · Fe^2+^/Fe^3+^ in I^–^/S~2~O~8~^2–^"]
    ]),
    T(27, "Group 2", "A", "inorg", [
      ["27.1", "Similarities and trends in the properties of the Group 2 metals, magnesium to barium, and their compounds", "Thermal stability and anion polarisation · solubility explained by lattice and hydration enthalpies"]
    ]),
    T(28, "Chemistry of transition elements", "A", "inorg", [
      ["28.1", "General physical and chemical properties of the first row of transition elements, titanium to copper", "Definition · d orbital shapes · variable oxidation states · catalysis · complex formation"],
      ["28.2", "General characteristic chemical properties of the first set of transition elements, titanium to copper", "Ligands and complexes · mono-, bi- and polydentate · geometry and coordination number · ligand exchange · redox titrations"],
      ["28.3", "Colour of complexes", "Splitting of d orbitals in octahedral and tetrahedral complexes · light absorbed vs colour seen"],
      ["28.4", "Stereoisomerism in transition element complexes", "Cis/trans and optical isomerism · polarity of complexes"],
      ["28.5", "Stability constants, K~stab~", "Writing and using K~stab~ · ligand exchange and complex stability"]
    ]),
    T(29, "An introduction to A Level organic chemistry", "A", "org", [
      ["29.1", "Formulas, functional groups and the naming of organic compounds", "Arenes, phenols, acyl chlorides, amides, amino acids · naming cyclic and aromatic compounds"],
      ["29.2", "Characteristic organic reactions", "Electrophilic substitution · addition–elimination"],
      ["29.3", "Shapes of aromatic organic molecules; σ and π bonds", "Benzene’s delocalised π system and sp^2^ carbons"],
      ["29.4", "Isomerism: optical", "Plane-polarised light · racemic mixtures · chirality in drug synthesis"]
    ]),
    T(30, "Hydrocarbons", "A", "org", [
      ["30.1", "Arenes", "Halogenation, nitration, Friedel–Crafts · side-chain oxidation · hydrogenation · electrophilic substitution mechanism · directing effects"]
    ]),
    T(31, "Halogen compounds", "A", "org", [
      ["31.1", "Halogen compounds", "Making halogenoarenes · reactivity of chlorobenzene vs chloroethane"]
    ]),
    T(32, "Hydroxy compounds", "A", "org", [
      ["32.1", "Alcohols", "Esters from alcohols and acyl chlorides"],
      ["32.2", "Phenol", "Preparation via diazonium salts · reactions with bases, sodium, diazonium salts · nitration and bromination · acidity"]
    ]),
    T(33, "Carboxylic acids and derivatives", "A", "org", [
      ["33.1", "Carboxylic acids", "Benzoic acid from alkylbenzenes · acyl chloride formation · oxidising methanoic and ethanedioic acids · relative acidities"],
      ["33.2", "Esters", "Esters from acyl chlorides, including phenyl benzoate"],
      ["33.3", "Acyl chlorides", "Reactions with water, alcohols, phenol, ammonia and amines · addition–elimination · ease of hydrolysis"]
    ]),
    T(34, "Nitrogen compounds", "A", "org", [
      ["34.1", "Primary and secondary amines", "Preparation · amides from acyl chlorides · basicity of amines"],
      ["34.2", "Phenylamine and azo compounds", "Making phenylamine · bromination · diazonium salts · relative basicity · azo dyes"],
      ["34.3", "Amides", "Preparation · hydrolysis · reduction to amines · weak basicity"],
      ["34.4", "Amino acids", "Zwitterions and isoelectric point · peptide bonds · electrophoresis"]
    ]),
    T(35, "Polymerisation", "A", "org", [
      ["35.1", "Condensation polymerisation", "Polyesters and polyamides · repeat units and monomers"],
      ["35.2", "Predicting the type of polymerisation", "Addition or condensation from monomers or a polymer section"],
      ["35.3", "Degradable polymers", "Inert poly(alkenes) · photodegradable polymers · hydrolysis of polyesters and polyamides"]
    ]),
    T(36, "Organic synthesis", "A", "org", [
      ["36.1", "Organic synthesis", "Multi-functional molecules · multi-step routes · analysing reagents and by-products"]
    ]),
    T(37, "Analytical techniques", "A", "anal", [
      ["37.1", "Thin-layer chromatography", "Stationary and mobile phases · R~f~ values"],
      ["37.2", "Gas/liquid chromatography", "Retention time · percentage composition from a chromatogram"],
      ["37.3", "Carbon-13 NMR spectroscopy", "Carbon environments · number of peaks · deducing structures"],
      ["37.4", "Proton (^1^H) NMR spectroscopy", "Chemical shift · peak areas · n + 1 splitting · TMS · deuterated solvents · D~2~O exchange"]
    ])
  ];

  // Practical skills — assessed in Paper 3 (AS & A Level) and Paper 5 (A Level only)
  var PRACTICAL = [
    { n: "P3", title: "Advanced Practical Skills (Paper 3)", level: "AS", branch: "prac", subs: [
      { id: "P3.1", title: "Manipulation, measurement and observation", keys: "Setting up apparatus · burette readings to 0.05 cm^3^ · concordant titres within 0.10 cm^3^ · deciding on repeats and confirmatory tests" },
      { id: "P3.2", title: "Presentation of data and observations", keys: "One results table with units in headings · consistent precision · showing working and significant figures · graphs" },
      { id: "P3.3", title: "Analysis, conclusions and evaluation", keys: "Trends and gradients · conclusions from data · sources of error and improvements" }
    ] },
    { n: "P5", title: "Planning, Analysis and Evaluation (Paper 5)", level: "A", branch: "prac", subs: [
      { id: "P5.1", title: "Planning", keys: "Designing an experiment for a question that may be outside the syllabus content" },
      { id: "P5.2", title: "Analysis", keys: "Processing and interpreting given experimental data" },
      { id: "P5.3", title: "Evaluation", keys: "Judging reliability and suggesting improvements" }
    ] }
  ];

  var BRANCHES = {
    phys:  { name: "Physical chemistry" },
    inorg: { name: "Inorganic chemistry" },
    org:   { name: "Organic chemistry" },
    anal:  { name: "Analysis" },
    prac:  { name: "Practical skills" }
  };

  var PAPERS = [
    { n: 1, name: "Multiple Choice", time: "1 h 15 min", marks: 40, format: "40 four-option questions", content: "AS content", as: 31, al: 15.5, kind: "theory" },
    { n: 2, name: "AS Level Structured Questions", time: "1 h 15 min", marks: 60, format: "Structured questions", content: "AS content", as: 46, al: 23, kind: "theory" },
    { n: 3, name: "Advanced Practical Skills", time: "2 h", marks: 40, format: "Lab practical and structured questions", content: "Practical skills", as: 23, al: 11.5, kind: "practical" },
    { n: 4, name: "A Level Structured Questions", time: "2 h", marks: 100, format: "Structured questions", content: "A Level content; AS knowledge assumed", as: null, al: 38.5, kind: "theory" },
    { n: 5, name: "Planning, Analysis and Evaluation", time: "1 h 15 min", marks: 30, format: "Structured questions", content: "Practical skills; contexts may be outside the syllabus", as: null, al: 11.5, kind: "practical" }
  ];

  // Command words — meanings paraphrased for this site
  var COMMAND_WORDS = [
    ["Analyse", "Break something down in detail to show what it means, what its parts are and how they relate."],
    ["Calculate", "Work out a value from the facts, figures or data given."],
    ["Compare", "Point out similarities, differences, or both."],
    ["Consider", "Look over the information given and respond to it."],
    ["Contrast", "Point out the differences."],
    ["Deduce", "Reach a conclusion from the information available."],
    ["Define", "Give the exact meaning."],
    ["Demonstrate", "Show how, or give an example."],
    ["Describe", "Give the main points or key features."],
    ["Determine", "Arrive at an answer using the information given."],
    ["Discuss", "Write about the issue in depth, in an organised way."],
    ["Evaluate", "Judge the quality, importance, amount or value of something."],
    ["Examine", "Look into something closely and in detail."],
    ["Explain", "Give reasons or purposes, make relationships clear, and back them with evidence."],
    ["Give", "Produce an answer from a source given or from memory."],
    ["Identify", "Name, pick out or recognise."],
    ["Justify", "Back up a case with evidence or argument."],
    ["Predict", "Say what is likely to happen, based on the information available."],
    ["Show (that)", "Set out a structured line of evidence that arrives at the stated result."],
    ["Sketch", "Make a simple drawing that shows the key features."],
    ["State", "Say it clearly and briefly."],
    ["Suggest", "Apply what you know to put forward ideas where more than one valid answer exists."]
  ];

  // Standard values used in 9701 calculations (always use the values printed in the paper)
  var CONSTANTS = [
    { name: "Molar gas constant", sym: "R", val: "8.31", unit: "J K^–1^ mol^–1^" },
    { name: "Faraday constant", sym: "F", val: "9.65 × 10^4^", unit: "C mol^–1^" },
    { name: "Avogadro constant", sym: "L", val: "6.022 × 10^23^", unit: "mol^–1^" },
    { name: "Charge on an electron", sym: "e", val: "–1.60 × 10^–19^", unit: "C" },
    { name: "Molar volume of gas at room conditions", sym: "V~m~", val: "24.0", unit: "dm^3^ mol^–1^" },
    { name: "Ionic product of water at 298 K", sym: "K~w~", val: "1.00 × 10^–14^", unit: "mol^2^ dm^–6^" },
    { name: "Specific heat capacity of water", sym: "c", val: "4.18", unit: "J g^–1^ K^–1^" }
  ];

  // [Z, symbol, name, Ar (1 d.p., null = no standard value), period, group (null = f-block), category]
  var ELEMENTS = [[1,"H","Hydrogen",1.0,1,1,"nm"],[2,"He","Helium",4.0,1,18,"ng"],[3,"Li","Lithium",6.9,2,1,"alk"],[4,"Be","Beryllium",9.0,2,2,"ae"],[5,"B","Boron",10.8,2,13,"md"],[6,"C","Carbon",12.0,2,14,"nm"],[7,"N","Nitrogen",14.0,2,15,"nm"],[8,"O","Oxygen",16.0,2,16,"nm"],[9,"F","Fluorine",19.0,2,17,"hal"],[10,"Ne","Neon",20.2,2,18,"ng"],[11,"Na","Sodium",23.0,3,1,"alk"],[12,"Mg","Magnesium",24.3,3,2,"ae"],[13,"Al","Aluminium",27.0,3,13,"pt"],[14,"Si","Silicon",28.1,3,14,"md"],[15,"P","Phosphorus",31.0,3,15,"nm"],[16,"S","Sulfur",32.1,3,16,"nm"],[17,"Cl","Chlorine",35.5,3,17,"hal"],[18,"Ar","Argon",40.0,3,18,"ng"],[19,"K","Potassium",39.1,4,1,"alk"],[20,"Ca","Calcium",40.1,4,2,"ae"],[21,"Sc","Scandium",45.0,4,3,"tm"],[22,"Ti","Titanium",47.9,4,4,"tm"],[23,"V","Vanadium",50.9,4,5,"tm"],[24,"Cr","Chromium",52.0,4,6,"tm"],[25,"Mn","Manganese",54.9,4,7,"tm"],[26,"Fe","Iron",55.8,4,8,"tm"],[27,"Co","Cobalt",58.9,4,9,"tm"],[28,"Ni","Nickel",58.7,4,10,"tm"],[29,"Cu","Copper",63.5,4,11,"tm"],[30,"Zn","Zinc",65.4,4,12,"tm"],[31,"Ga","Gallium",69.7,4,13,"pt"],[32,"Ge","Germanium",72.6,4,14,"md"],[33,"As","Arsenic",74.9,4,15,"md"],[34,"Se","Selenium",79.0,4,16,"nm"],[35,"Br","Bromine",79.9,4,17,"hal"],[36,"Kr","Krypton",83.8,4,18,"ng"],[37,"Rb","Rubidium",85.5,5,1,"alk"],[38,"Sr","Strontium",87.6,5,2,"ae"],[39,"Y","Yttrium",88.9,5,3,"tm"],[40,"Zr","Zirconium",91.2,5,4,"tm"],[41,"Nb","Niobium",92.9,5,5,"tm"],[42,"Mo","Molybdenum",96.0,5,6,"tm"],[43,"Tc","Technetium",null,5,7,"tm"],[44,"Ru","Ruthenium",101.1,5,8,"tm"],[45,"Rh","Rhodium",102.9,5,9,"tm"],[46,"Pd","Palladium",106.4,5,10,"tm"],[47,"Ag","Silver",107.9,5,11,"tm"],[48,"Cd","Cadmium",112.4,5,12,"tm"],[49,"In","Indium",114.8,5,13,"pt"],[50,"Sn","Tin",118.7,5,14,"pt"],[51,"Sb","Antimony",121.8,5,15,"md"],[52,"Te","Tellurium",127.6,5,16,"md"],[53,"I","Iodine",126.9,5,17,"hal"],[54,"Xe","Xenon",131.3,5,18,"ng"],[55,"Cs","Caesium",132.9,6,1,"alk"],[56,"Ba","Barium",137.3,6,2,"ae"],[57,"La","Lanthanum",138.9,6,null,"ln"],[58,"Ce","Cerium",140.1,6,null,"ln"],[59,"Pr","Praseodymium",140.9,6,null,"ln"],[60,"Nd","Neodymium",144.2,6,null,"ln"],[61,"Pm","Promethium",null,6,null,"ln"],[62,"Sm","Samarium",150.4,6,null,"ln"],[63,"Eu","Europium",152.0,6,null,"ln"],[64,"Gd","Gadolinium",157.3,6,null,"ln"],[65,"Tb","Terbium",158.9,6,null,"ln"],[66,"Dy","Dysprosium",162.5,6,null,"ln"],[67,"Ho","Holmium",164.9,6,null,"ln"],[68,"Er","Erbium",167.3,6,null,"ln"],[69,"Tm","Thulium",168.9,6,null,"ln"],[70,"Yb","Ytterbium",173.0,6,null,"ln"],[71,"Lu","Lutetium",175.0,6,null,"ln"],[72,"Hf","Hafnium",178.5,6,4,"tm"],[73,"Ta","Tantalum",180.9,6,5,"tm"],[74,"W","Tungsten",183.8,6,6,"tm"],[75,"Re","Rhenium",186.2,6,7,"tm"],[76,"Os","Osmium",190.2,6,8,"tm"],[77,"Ir","Iridium",192.2,6,9,"tm"],[78,"Pt","Platinum",195.1,6,10,"tm"],[79,"Au","Gold",197.0,6,11,"tm"],[80,"Hg","Mercury",200.6,6,12,"tm"],[81,"Tl","Thallium",204.4,6,13,"pt"],[82,"Pb","Lead",207.2,6,14,"pt"],[83,"Bi","Bismuth",209.0,6,15,"pt"],[84,"Po","Polonium",null,6,16,"pt"],[85,"At","Astatine",null,6,17,"hal"],[86,"Rn","Radon",null,6,18,"ng"],[87,"Fr","Francium",null,7,1,"alk"],[88,"Ra","Radium",null,7,2,"ae"],[89,"Ac","Actinium",null,7,null,"an"],[90,"Th","Thorium",232.0,7,null,"an"],[91,"Pa","Protactinium",231.0,7,null,"an"],[92,"U","Uranium",238.0,7,null,"an"],[93,"Np","Neptunium",null,7,null,"an"],[94,"Pu","Plutonium",null,7,null,"an"],[95,"Am","Americium",null,7,null,"an"],[96,"Cm","Curium",null,7,null,"an"],[97,"Bk","Berkelium",null,7,null,"an"],[98,"Cf","Californium",null,7,null,"an"],[99,"Es","Einsteinium",null,7,null,"an"],[100,"Fm","Fermium",null,7,null,"an"],[101,"Md","Mendelevium",null,7,null,"an"],[102,"No","Nobelium",null,7,null,"an"],[103,"Lr","Lawrencium",null,7,null,"an"],[104,"Rf","Rutherfordium",null,7,4,"tm"],[105,"Db","Dubnium",null,7,5,"tm"],[106,"Sg","Seaborgium",null,7,6,"tm"],[107,"Bh","Bohrium",null,7,7,"tm"],[108,"Hs","Hassium",null,7,8,"tm"],[109,"Mt","Meitnerium",null,7,9,"tm"],[110,"Ds","Darmstadtium",null,7,10,"tm"],[111,"Rg","Roentgenium",null,7,11,"tm"],[112,"Cn","Copernicium",null,7,12,"tm"],[113,"Nh","Nihonium",null,7,13,"pt"],[114,"Fl","Flerovium",null,7,14,"pt"],[115,"Mc","Moscovium",null,7,15,"pt"],[116,"Lv","Livermorium",null,7,16,"pt"],[117,"Ts","Tennessine",null,7,17,"hal"],[118,"Og","Oganesson",null,7,18,"ng"]];

  var CATEGORIES = {
    alk: "Alkali metal",
    ae:  "Alkaline earth metal",
    tm:  "Transition metal",
    pt:  "Post-transition metal",
    md:  "Metalloid",
    nm:  "Other non-metal",
    hal: "Halogen",
    ng:  "Noble gas",
    ln:  "Lanthanoid",
    an:  "Actinoid"
  };

  window.CHEM = {
    TOPICS: TOPICS, PRACTICAL: PRACTICAL, BRANCHES: BRANCHES, PAPERS: PAPERS,
    COMMAND_WORDS: COMMAND_WORDS, CONSTANTS: CONSTANTS, ELEMENTS: ELEMENTS, CATEGORIES: CATEGORIES,
    SYLLABUS_URL: "https://www.cambridgeinternational.org/Images/664563-2025-2027-syllabus.pdf",
    SYLLABUS_NEXT_URL: "https://www.cambridgeinternational.org/Images/744624-2028-2030-syllabus.pdf"
  };
})();
