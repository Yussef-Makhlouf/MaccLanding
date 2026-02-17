import { Service, Locale } from "./types";

export const getMockServices = (locale: Locale): Service[] => {
    const isAr = locale === "ar";

    const rawServices: Service[] = [
        {
            id: "1",
            isActive: true,
            header: {
                title: isAr ? "الخدمات الصلبة" : "Hard Services",
                sub_title: isAr ? "خدمات فنية وهندسية موثوقة" : "Reliable Technical & Engineering Services",
                description: isAr
                    ? "من الأنظمة الكهربائية وأنظمة التكييف إلى أنظمة السلامة من الحريق والسباكة، نضمن تشغيلًا سلسًا بأعلى درجات الدقة والاحترافية."
                    : "From electrical systems and HVAC to fire safety and plumbing, we ensure smooth operation with the highest precision and professionalism.",
                image: "/images/services/hard-hero.png",
            },
            services: [
                {
                    id: "hard-1",
                    number: "01",
                    title: isAr ? "الأنظمة الكهربائية" : "Electrical Systems",
                    category: isAr ? "حلول كهربائية موثوقة" : "Reliable Electrical Solutions",
                    description: isAr
                        ? "من توزيع الطاقة إلى تحسين كفاءة الاستهلاك، نضمن أنظمة كهربائية آمنة وفعالة لتشغيل مستمر دون انقطاع."
                        : "From power distribution to optimizing consumption efficiency, we ensure safe and efficient electrical systems for continuous operation.",
                    image: "/images/services/hard1.png",
                    color: "#E2B133",
                    order: 1,
                },
                {
                    id: "hard-2",
                    number: "02",
                    title: isAr ? "أنظمة التكييف والتبريد" : "HVAC & Cooling Systems",
                    category: isAr ? "أنظمة تكييف ذكية للراحة والكفاءة" : "Smart HVAC Systems for Comfort & Efficiency",
                    description: isAr
                        ? "نقوم بتصميم وصيانة أنظمة التكييف التي توفر تحكمًا مثاليًا في درجات الحرارة وكفاءة عالية في استهلاك الطاقة طوال العام."
                        : "We design and maintain HVAC systems that provide optimal temperature control and high energy efficiency throughout the year.",
                    image: "/images/services/hard2.png",
                    color: "#E2B133",
                    order: 2,
                },
                {
                    id: "hard-3",
                    number: "03",
                    title: isAr ? "أنظمة السلامة من الحريق" : "Fire Safety Systems",
                    category: isAr ? "التميز في أنظمة السلامة من الحريق" : "Excellence in Fire Safety Systems",
                    description: isAr
                        ? "تركيب وصيانة أنظمة متقدمة للكشف عن الحرائق ومكافحتها لضمان أعلى مستويات السلامة."
                        : "Installation and maintenance of advanced fire detection and suppression systems to ensure the highest levels of safety.",
                    image: "/images/services/hard3.png",
                    color: "#E2B133",
                    order: 3,
                },
                {
                    id: "hard-4",
                    number: "04",
                    title: isAr ? "أنظمة السباكة والمياه" : "Plumbing & Water Systems",
                    category: isAr ? "سباكة موثوقة وإدارة تدفق المياه" : "Reliable Plumbing & Water Flow Management",
                    description: isAr
                        ? "من اكتشاف التسريبات إلى صيانة خطوط الأنابيب، نضمن توزيعًا مستمرًا وآمنًا وفعالًا للمياه."
                        : "From leak detection to pipeline maintenance, we ensure continuous, safe, and efficient water distribution.",
                    image: "/images/services/hard4.png",
                    color: "#E2B133",
                    order: 4,
                },
            ],
        },
        {
            id: "2",
            isActive: true,
            header: {
                title: isAr ? "الخدمات اللينة" : "Soft Services",
                sub_title: isAr ? "بيئات نظيفة ومريحة" : "Creating Clean, Comfortable Environments",
                description: isAr
                    ? "نوفر أعلى مستويات النظافة والراحة وراحة البال من خلال خدمات تنظيف احترافية ومكافحة الآفات ودعم يركز على رضا العملاء."
                    : "We provide hygiene, comfort, and peace of mind through professional cleaning, pest control, and customer-centered support.",
                image: "/images/services/soft-hero.png",
            },
            services: [
                {
                    id: "soft-1",
                    number: "01",
                    title: isAr ? "خدمات التنظيف" : "Cleaning Services",
                    category: isAr ? "حلول نظافة احترافية" : "Professional Hygiene Solutions",
                    description: isAr
                        ? "تقديم بيئات خالية من البقع من خلال التنظيف الروتيني والعميق للمكاتب والمولات والمنشآت السكنية."
                        : "Office and Workspace Services Our Office and Workspace Services are tailored to enhance operational efficiency, employee experience and workspace optimization. We offer comprehensive solutions including office space planning, relocation management, furniture coordination, facilities inspection, key control and occupancy allocation. Our dedicated team also manages helpdesk support and conference room bookings to ensure seamless daily operations. With expertise in business events management, we handle planning and logistics with precision and professionalism. By integrating technology and best practices, MACC FM delivers high-quality, responsive workspace services that support productivity and align with our clients' evolving business needs",
                    image: "/images/services/soft1.png",
                    color: "#E2B133",
                    order: 1,
                },
                {
                    id: "soft-2",
                    number: "02",
                    title: isAr ? "إدارة النفايات" : "Waste Management",
                    category: isAr ? "إعادة تعريف النفايات كفرصة" : "Redefining Waste into Opportunity",
                    description: isAr
                        ? "أنظمة حديثة لجمع النفايات وإعادة تدويرها والتخلص منها ، مصممة للكفاءة والعناية بالبيئة."
                        : "Hospitality Services Our Hospitality Services are tailored to provide exceptional guest experience within a facility management framework. We deliver high-quality concierge, reception, catering support and VIP services that reflect professionalism, attention to detail and cultural sensitivity. Whether serving corporate offices, events or specialized venues, our trained teams ensure a welcoming atmosphere, seamless coordination and impeccable service standards—demonstrating our commitment to excellence and client satisfaction in every interaction",
                    image: "/images/services/soft2.png",
                    color: "#E2B133",
                    order: 2,
                },
                {
                    id: "soft-3",
                    number: "03",
                    title: isAr ? "خدمات المغاسل والبياضات" : "Laundry & Linen Service",
                    category: isAr ? "عناية فائقة بالمغاسل للمرافق المتميزة" : "Flawless Laundry Care for Premium Facilities",
                    description: isAr
                        ? "توفير خدمات غسيل وكي وإدارة بياضات عالية الجودة للفنادق والمستشفيات وعملاء الشركات."
                        : "Accommodation & Property Management Our Accommodation Services deliver end-to-end property management solutions tailored to the needs of our clients. We offer expert management of residential properties, attentive customer care, efficient invoicing and financial administration and a range of hospitality services. Our experienced staff ensures every aspect of property occupancy, from move-in to departure, is handled with professionalism and care. With a strong focus on quality assurance and community well-being, we are committed to providing the highest standards, peace of mind and satisfaction for both residents and property owners.",
                    image: "/images/services/soft3.png",
                    color: "#E2B133",
                    order: 3,
                },
            ],
        },
        {
            id: "3",
            isActive: true,
            header: {
                title: isAr ? "خدمات المواقع الخارجية" : "Ground Services",
                sub_title: isAr ? "تنسيق مستدام ورعاية متكاملة للمساحات الخارجية" : "Sustainable Landscaping & Outdoor Care",
                description: isAr
                    ? "نقوم بتصميم وصيانة المساحات الخارجية بما يعزز الجمال والاستدامة والراحة لجميع المنشآت."
                    : "We design and maintain outdoor environments that promote beauty, sustainability, and comfort for every facility.",
                image: "/images/services/ground-hero.png",
            },
            services: [
                {
                    id: "ground-1",
                    number: "01",
                    title: isAr ? "تصميم المناظر الطبيعية" : "Landscaping Design",
                    category: isAr ? "مساحات خارجية جميلة تلهم" : "Beautiful Outdoor Spaces That Inspire",
                    description: isAr
                        ? "نحن نصمم ونشكل مساحات خضراء أنيقة تمزج بين الطبيعة والهندسة المعمارية لجمال دائم."
                        : "We design and shape elegant green areas that blend nature and architecture for lasting beauty.",
                    image: "/images/services/ground1.png",
                    color: "#E2B133",
                    order: 1,
                },
                {
                    id: "ground-2",
                    number: "02",
                    title: isAr ? "أنظمة الري" : "Irrigation Systems",
                    category: isAr ? "سقي ذكي لمساحات أكثر خضرة" : "Smart Watering for Greener Spaces",
                    description: isAr
                        ? "أنظمة ري آلية مصممة لتوفير المياه مع الحفاظ على حديقتك خصبة طوال العام."
                        : "Automated irrigation systems designed to save water while keeping your landscapes lush all year long.",
                    image: "/images/services/ground2.png",
                    color: "#E2B133",
                    order: 2,
                },
                {
                    id: "ground-3",
                    number: "03",
                    title: isAr ? "صيانة الحدائق" : "Garden Maintenance",
                    category: isAr ? "الحفاظ على كل ورقة في شكل مثالي" : "Keeping Every Leaf in Perfect Shape",
                    description: isAr
                        ? "تضمن فرق الخبراء لدينا بقاء حدائقك نظيفة وصحية ومليئة بالحياة من خلال العناية المنتظمة."
                        : "Our expert teams ensure your gardens stay clean, healthy, and full of life through regular care.",
                    image: "/images/services/ground3.png",
                    color: "#E2B133",
                    order: 3,
                },
                {
                    id: "ground-4",
                    number: "04",
                    title: isAr ? "الاستدامة الخضراء" : "Green Sustainability",
                    category: isAr ? "حلول صديقة للطبيعة للمساحات الحديثة" : "Nature-Friendly Solutions for Modern Spaces",
                    description: isAr
                        ? "نحن ندمج مواد صديقة للبيئة وطرق تنسيق مستدامة تحمي الكوكب."
                        : "We integrate eco-friendly materials and sustainable landscaping methods that protect the planet.",
                    image: "/images/services/ground4.png",
                    color: "#E2B133",
                    order: 4,
                },
                {
                    id: "ground-5",
                    number: "05",
                    title: isAr ? "مكافحة الآفات" : "Pest Control",
                    category: isAr ? "الصحة والسلامة أولاً" : "Health & Safety First",
                    description: isAr
                        ? "برامج شاملة لمكافحة الآفات تضمن مرافق آمنة وخالية من الآفات بطرق صديقة للبيئة."
                        : "Comprehensive pest control programs ensuring safe, pest-free facilities with eco-friendly methods.",
                    image: "/images/services/ground5.png",
                    color: "#E2B133",
                    order: 5,
                },
            ],
        },
        {
            id: "4",
            isActive: true,
            header: {
                title: isAr ? "خدمات المشاريع الخاصة" : "Special Projects Services",
                sub_title: isAr ? "تقديم التميز بما يتجاوز المعايير" : "Delivering Excellence Beyond Standards",
                description: isAr
                    ? "يدير قسم المشاريع الخاصة حلول منشآت مخصصة وعالية التأثير تلبي متطلبات العملاء المعقدة بدقة وابتكار."
                    : "Our Special Projects Division manages high-impact, custom-built facility solutions that meet complex client requirements with precision and innovation.",
                image: "/images/services/special-hero.png",
            },
            services: [
                {
                    id: "special-1",
                    number: "01",
                    title: isAr ? "حلول التصميم المخصصة" : "Customized Design Solutions",
                    category: isAr ? "تصاميم لكل صناعة" : "Designs for Every Industry",
                    description: isAr
                        ? "نحن نصمم تخطيطات وهياكل مخصصة تلبي الاحتياجات الفنية والجمالية لكل عميل."
                        : "We craft customized layouts and structures that meet each client’s technical and aesthetic needs.",
                    image: "/images/services/special1.png",
                    color: "#E2B133",
                    order: 1,
                },
                {
                    id: "special-2",
                    number: "02",
                    title: isAr ? "تكامل المباني الذكية" : "Smart Building Integration",
                    category: isAr ? "ربط التكنولوجيا مع العمارة" : "Connecting Technology with Architecture",
                    description: isAr
                        ? "من مستشعرات إنترنت الأشياء إلى أنظمة التحكم الآلية، نجلب الذكاء إلى مبانيك."
                        : "From IoT sensors to automated control systems, we bring intelligence to your buildings.",
                    image: "/images/services/special2.png",
                    color: "#E2B133",
                    order: 2,
                },
                {
                    id: "special-3",
                    number: "03",
                    title: isAr ? "ترقية المرافق" : "Facility Upgrades",
                    category: isAr ? "بناء متخصص لبيئات عالية الأمان" : "Specialized Builds for High-Security Environments",
                    description: isAr
                        ? "تصميمات مبنية خصيصًا للبيئات المقيدة وعالية الأمان مع أنظمة مراقبة متقدمة."
                        : "Specialized builds designed for restricted, high-security environments with advanced monitoring systems.",
                    image: "/images/services/special3.png",
                    color: "#E2B133",
                    order: 3,
                },
                {
                    id: "special-4",
                    number: "04",
                    title: isAr ? "تحديث الأنظمة" : "System Modernization",
                    category: isAr ? "تحويل المساحات الحالية إلى معايير حديثة" : "Transforming Existing Spaces Into Modern Standards",
                    description: isAr
                        ? "يقوم خبراؤنا بتنشيط الأنظمة والهياكل القديمة ، مما يوفر أداءً مستدامًا وفعالًا."
                        : "Our experts revitalize outdated systems and structures, delivering sustainable and efficient performance.",
                    image: "/images/services/special4.png",
                    color: "#E2B133",
                    order: 4,
                },
                {
                    id: "special-5",
                    number: "05",
                    title: isAr ? "تطوير البنية التحتية" : "Infrastructure Development",
                    category: isAr ? "من التصميم إلى الانتهاء بسلاسة" : "From Design to Completion, Seamlessly",
                    description: isAr
                        ? "ندير كل مرحلة من مراحل مشروعك - التصميم والتنفيذ والتسليم - بدقة."
                        : "We manage every phase of your project — design, execution, and handover — with precision.",
                    image: "/images/services/special5.png",
                    color: "#E2B133",
                    order: 5,
                },
                {
                    id: "special-6",
                    number: "06",
                    title: isAr ? "حلول البنية التحتية المتقدمة" : "Advanced Infrastructure Solutions",
                    category: isAr ? "بناء العمود الفقري لمرافق المستقبل" : "Building the Backbone of Future Facilities",
                    description: isAr
                        ? "نتعامل مع أعمال البنية التحتية الشاملة، من المرافق ومراكز البيانات إلى المصانع المتقدمة."
                        : "We handle end-to-end infrastructure work, from utilities and data centers to advanced plants.",
                    image: "/images/services/special6.png",
                    color: "#E2B133",
                    order: 6,
                },
            ],
        },
        {
            id: "5",
            isActive: true,
            header: {
                title: isAr ? "الخدمات الهندسية" : "Engineering Services",
                sub_title: isAr ? "هندسة ذكية للمنشآت الحديثة" : "Smart Engineering for Modern Facilities",
                description: isAr
                    ? "نقوم بتصميم وصيانة البيئات الخارجية بما يعزز الجمال والاستدامة والراحة لكل منشأة."
                    : "We design and maintain outdoor environments that promote beauty, sustainability, and comfort for every facility.",
                image: "/images/services/engineering-hero.png",
            },
            services: [
                {
                    id: "eng-1",
                    number: "01",
                    title: isAr ? "الهندسة الميكانيكية" : "Mechanical Engineering",
                    category: isAr ? "أنظمة التدفئة والتهوية وتكييف الهواء المبتكرة والطاقة" : "Innovative HVAC & Energy Systems",
                    description: isAr
                        ? "نقوم بتصميم وصيانة أنظمة التدفئة والتهوية والتبريد الفعالة التي تعمل على تحسين استخدام الطاقة وضمان الراحة."
                        : "We design and maintain efficient heating, ventilation, and cooling systems that optimize energy use and ensure comfort.",
                    image: "/images/services/engineering1.png",
                    color: "#E2B133",
                    order: 1,
                },
                {
                    id: "eng-2",
                    number: "02",
                    title: isAr ? "الهندسة الكهربائية" : "Electrical Engineering",
                    category: isAr ? "تشغيل المرافق بدقة" : "Powering Facilities With Precision",
                    description: isAr
                        ? "من توزيع الطاقة إلى الإضاءة والأتمتة ، نقدم أنظمة كهربائية موثوقة تدفع الأداء."
                        : "From power distribution to lighting and automation, we deliver reliable electrical systems that drive performance.",
                    image: "/images/services/engineering2.png",
                    color: "#E2B133",
                    order: 2,
                },
                {
                    id: "eng-3",
                    number: "03",
                    title: isAr ? "الهندسة الإنشائية" : "Structural Engineering",
                    category: isAr ? "بناء العمود الفقري لكل مرفق" : "Building the Backbone of Every Facility",
                    description: isAr
                        ? "تجمع تصميماتنا الهيكلية بين القوة والابتكار والاستدامة لضمان بنية تحتية طويلة الأمد وعالية الأداء."
                        : "Our structural designs combine strength, innovation, and sustainability to ensure long-lasting and high-performing infrastructure.",
                    image: "/images/services/engineering3.png",
                    color: "#E2B133",
                    order: 3,
                },
                {
                    id: "eng-4",
                    number: "04",
                    title: isAr ? "الأتمتة والتحكم" : "Automation & Control",
                    category: isAr ? "أنظمة ذكية لعمليات أكثر ذكاءً" : "Smart Systems for Smarter Operations",
                    description: isAr
                        ? "نحن ندمج أنظمة تحكم ذكية تراقب وتضبط وتحسن الأداء لإدارة المرافق المستدامة."
                        : "We integrate intelligent control systems that monitor, adjust, and improve performance for sustainable facility management.",
                    image: "/images/services/engineering4.png",
                    color: "#E2B133",
                    order: 4,
                },
            ],
        },
        {
            id: "6",
            isActive: true,
            header: {
                title: isAr ? "خدمات التغذية" : "Catering Services",
                sub_title: isAr ? "خدمات تغذية متميزة لكل منشأة" : "Premium Catering For Every Facility",
                description: isAr
                    ? "نقدم خدمات غذائية آمنة وعالية الجودة ومخصصة لتعزيز رضا الموظفين وراحة بيئة العمل والرفاهية العامة."
                    : "We deliver safe, high-quality, and customized food services designed to enhance employee satisfaction, workplace comfort, and overall well-being.",
                image: "/images/services/catering-hero.png",
            },
            services: [
                {
                    id: "cat-1",
                    number: "01",
                    title: isAr ? "تغذية الشركات" : "Corporate Catering",
                    category: isAr ? "وجبات مخصصة لكل قوة عاملة" : "Tailored Meals for Every Workforce",
                    description: isAr
                        ? "نحن نقدم خطط وجبات صحية ومتوازنة ومخصصة للحفاظ على نشاط الفرق وإنتاجيتها طوال يوم العمل."
                        : "We provide healthy, balanced, and customized meal plans to keep teams energized and productive throughout the workday.",
                    image: "/images/services/catering1.png",
                    color: "#E2B133",
                    order: 1,
                },
                {
                    id: "cat-2",
                    number: "02",
                    title: isAr ? "تغذية الحفلات والمناسبات" : "Event Catering",
                    category: isAr ? "ضيافة سلسة لكل مناسبة" : "Seamless Hospitality for Every Occasion",
                    description: isAr
                        ? "من المؤتمرات إلى التجمعات التجارية، نقدم حلول ضيافة أنيقة تثير إعجاب الضيوف وتبسط الأمور اللوجستية."
                        : "From conferences to corporate gatherings, we deliver elegant catering solutions that impress guests and simplify logistics.",
                    image: "/images/services/catering2.png",
                    color: "#E2B133",
                    order: 2,
                },
                {
                    id: "cat-3",
                    number: "03",
                    title: isAr ? "التغذية الصناعية" : "Industrial Catering",
                    category: isAr ? "تغذية واسعة النطاق ، مبسطة" : "Large-Scale Nutrition, Simplified",
                    description: isAr
                        ? "نحن ندير عمليات التغذية الجماعية للمصانع والمواقع الصناعية بمعايير عالية من النظافة والاتساق."
                        : "We manage bulk catering operations for factories and industrial sites with high standards of hygiene and consistency.",
                    image: "/images/services/catering3.png",
                    color: "#E2B133",
                    order: 3,
                },
                {
                    id: "cat-4",
                    number: "04",
                    title: isAr ? "إدارة التموين" : "Pantry Management",
                    category: isAr ? "راحة يومية ، مدارة باحترافية" : "Daily Comfort, Professionally Managed",
                    description: isAr
                        ? "تضمن خدمات التموين لدينا بيئة نظيفة وجيدة التجهيز وممتعة تعزز رضا الموظفين ومعنوياتهم."
                        : "Our pantry services ensure a clean, well-stocked, and pleasant environment that boosts employee satisfaction and morale.",
                    image: "/images/services/catering4.png",
                    color: "#E2B133",
                    order: 4,
                },
                {
                    id: "cat-5",
                    number: "05",
                    title: isAr ? "تغذية الصحة والسلامة" : "Health & Safety Catering",
                    category: isAr ? "طعام يمكنك الوثوق به" : "Food You Can Trust",
                    description: isAr
                        ? "نحن نحافظ على معايير صارمة للنظافة والتحكم في درجة الحرارة والمعايير الغذائية لضمان سلامة الأغذية والامتثال الكامل."
                        : "We maintain strict hygiene, temperature control, and nutritional standards to ensure food safety and full compliance.",
                    image: "/images/services/catering5.png",
                    color: "#E2B133",
                    order: 5,
                },
                {
                    id: "cat-6",
                    number: "06",
                    title: isAr ? "تغذية كبار الشخصيات والتنفيذيين" : "VIP & Executive Catering",
                    category: isAr ? "تناول طعام فاخر للقادة" : "Luxury Dining for Leaders",
                    description: isAr
                        ? "نحن نرسي قوائم طعام متميزة وتجارب طعام فاخرة مصممة لإبهار التنفيذيين ورفع صورة الشركة."
                        : "We curate premium menus and fine dining experiences designed to impress executives and elevate corporate image.",
                    image: "/images/services/catering6.png",
                    color: "#E2B133",
                    order: 6,
                },
            ],
        },
    ];

    const colorMap: Record<string, string> = {
        "1": "#5C677D", // Hard Services
        "2": "#D4AF37", // Soft Services
        "3": "#4CAF50", // Ground Services
        "4": "#6C63FF", // Special Projects Services
        "5": "#007ACC", // Engineering Services
        "6": "#C69C6D"  // Catering Services
    };

    return rawServices.map(s => ({
        ...s,
        services: s.services.map(item => ({
            ...item,
            color: colorMap[s.id] || "#E2B133"
        }))
    }));
};

export const getMockServiceById = (id: string, locale: Locale): Service | undefined => {
    const services = getMockServices(locale);
    return services.find((s) => s.id === id);
};
