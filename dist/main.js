"use strict";
class CVApp {
    constructor() {
        this.data = {
            skills: [
                // Programming Languages
                { name: 'R', category: 'languages' },
                { name: 'Python', category: 'languages' },
                { name: 'JavaScript', category: 'languages' },
                { name: 'UNIX/Bash', category: 'languages' },
                { name: 'SQL', category: 'languages' },
                { name: 'PHP', category: 'languages' },
                // Frameworks & Libraries
                { name: 'R Shiny', category: 'frameworks' },
                { name: 'Bioinformatics Pipelines', category: 'frameworks' },
                { name: 'NGS Analysis', category: 'frameworks' },
                { name: 'Statistical Modeling', category: 'frameworks' },
                { name: 'Data Visualization', category: 'frameworks' },
                { name: 'REST APIs', category: 'frameworks' },
                // Tools & Technologies
                { name: 'Next-Generation Sequencing (NGS)', category: 'tools' },
                { name: 'CRISPR/CRISPRi-Seq', category: 'tools' },
                { name: 'Tn-Seq', category: 'tools' },
                { name: 'Genomic Data Analysis', category: 'tools' },
                { name: 'Systems Biology', category: 'tools' },
                { name: 'Microbiology', category: 'tools' },
                { name: 'Git', category: 'tools' },
                { name: 'Docker', category: 'tools' }
            ],
            experience: [
                {
                    title: 'Data Scientist',
                    company: 'CHUV | Lausanne University Hospital - Data Stewardship Biomed Unit',
                    period: 'Aug 2024 - Present',
                    description: [
                        'Develop and maintain data management solutions for biomedical research data',
                        'Build full-stack applications using PHP for scientific data documentation and workflow optimization',
                        'Design database systems and APIs to facilitate data integration across research teams',
                        'Collaborate with researchers and clinicians to translate data management needs into technical solutions',
                        'Ensure compliance with biomedical data standards and regulatory requirements'
                    ]
                },
                {
                    title: 'PhD Candidate - Life Sciences',
                    company: 'University of Lausanne (UNIL) - Veening Lab',
                    period: 'Mar 2019 - Feb 2024',
                    description: [
                        'Conducted genome-wide genetic interaction network research in Streptococcus pneumoniae',
                        'Developed and optimized custom Python and R scripts for NGS data analysis and visualization',
                        'Applied Dual CRISPRi-Seq methodology to map genetic interactions on a genome-wide basis',
                        'Performed enrichment analysis and statistical modeling of large-scale genomic datasets',
                        'Published research findings and presented at international scientific conferences',
                        'Mentored master students in bioinformatics and molecular biology techniques'
                    ]
                },
                {
                    title: 'Master Student Researcher',
                    company: 'University of Lausanne (UNIL) - Veening Lab',
                    period: 'Sep 2017 - Feb 2019',
                    description: [
                        'Characterized new pneumococcal cell division proteins through molecular cloning',
                        'Developed analytical skills in R programming for biological data analysis',
                        'Conducted laboratory experiments in microbiology and molecular biology',
                        'Applied statistical methods to analyze experimental results and validate hypotheses'
                    ]
                }
            ],
            projects: [
                {
                    title: 'Genome-wide Genetic Interaction Networks',
                    technologies: 'Python, R, NGS, CRISPRi-Seq, Bioinformatics',
                    period: '2019 - 2024',
                    description: [
                        'PhD thesis project mapping genetic interactions in Streptococcus pneumoniae using Dual CRISPRi-Seq',
                        'Developed custom Python and R scripts for large-scale genomic data analysis and visualization',
                        'Applied advanced statistical methods and enrichment analysis to identify functional gene networks',
                        'Generated insights into pneumococcal cell cycle regulation through computational approaches',
                        'Published findings in peer-reviewed journals and presented at international conferences'
                    ]
                },
                {
                    title: 'Biomedical Data Management Platform',
                    technologies: 'PHP, MySQL, JavaScript, REST APIs',
                    period: '2024 - Present',
                    description: [
                        'Full-stack web application for biomedical research data documentation at CHUV',
                        'Designed database schemas to handle complex clinical and research data structures',
                        'Built RESTful APIs for seamless data integration across hospital and research systems',
                        'Implemented data validation and compliance features for biomedical research standards',
                        'Created user-friendly interfaces for clinicians and researchers to manage their data'
                    ]
                },
                {
                    title: 'DIY Self-Hosted NAS Server',
                    technologies: 'Linux, Networking, Storage Systems, 3D Printing, Open Source',
                    period: '2023 - Ongoing',
                    description: [
                        'Designed and built a fully custom self-hosted NAS server with 3D-printed components',
                        'Configured Linux-based storage systems with redundancy and automated backup solutions',
                        'Implemented secure networking for remote access and file sharing capabilities',
                        'Utilized open-source technologies for media streaming and personal cloud services',
                        'Strengthened skills in system administration and hardware integration'
                    ]
                }
            ],
            education: [
                {
                    degree: 'Doctor of Philosophy (PhD) - Life Sciences',
                    school: 'University of Lausanne (UNIL)',
                    year: '2019 - 2024',
                    thesis: 'Genome-wide genetic interaction networks: from methods to insights into the pneumococcal cell cycle',
                    advisor: 'Jan-Willem Veening'
                },
                {
                    degree: 'Master of Science - Molecular Life Sciences',
                    school: 'University of Lausanne (UNIL)',
                    year: '2017 - 2019',
                    thesis: 'Exploring Streptococcus pneumoniae cell division by re-evaluating the function of the highly conserved protein DivIVA using CRISPRi-Seq and Tn-Seq',
                    advisor: 'Jan-Willem Veening'
                },
                {
                    degree: 'Bachelor of Science - Biological Sciences',
                    school: 'University of Lausanne (UNIL)',
                    year: '2013 - 2017'
                }
            ],
            languages: [
                { name: 'French', level: 'Native' },
                { name: 'English', level: 'Fluent' },
                { name: 'German', level: 'Basic' }
            ],
            qualifications: [
                {
                    category: 'Problem solving',
                    description: 'Developed two R Shiny applications and scripting in multiple programming languages, facilitating the analysis and visualization of different datasets.'
                },
                {
                    category: 'Analytical thinking',
                    description: 'Demonstrated in-depth analytical skill in genomics by performing NGS sequencing and enrichment analysis using R and Python.'
                },
                {
                    category: 'Teamwork & collaboration',
                    description: 'Fostered collaborative environments by working closely with diverse team members on multiple simultaneous projects, leading to successful publications.'
                },
                {
                    category: 'Communication',
                    description: 'Presented at multiple local and international scientific conferences, shared progress reports within the department regularly.'
                }
            ],
            publications: [
                {
                    year: '2024',
                    title: 'Dual CRISPRi-Seq for genome-wide genetic identifies key genes involved in the pneumococcal cell cycle',
                    authors: 'Julien Dénéréaz et al.',
                    journal: 'In preparation'
                },
                {
                    year: '2024',
                    title: 'BactEXTRACT: an R-Shiny app to quickly extract, plot and analyse bacterial growth and gene expression',
                    authors: 'Julien Dénéréaz et al.',
                    journal: 'Access Microbiology',
                    doi: 'https://doi.org/10.1099/acmi.0.000742.v3'
                },
                {
                    year: '2023',
                    title: 'CRISPRi-TnSeq: A genome-wide high-throughput tool for bacterial essential-nonessential genetic interaction mapping',
                    authors: 'Bimal Jana, Xue Liu, Julien Dénéréaz et al.',
                    journal: 'Preprint on bioRxiv',
                    doi: 'https://doi.org/10.1101/2023.05.31.543074'
                },
                {
                    year: '2022',
                    title: 'Amoxicillin-resistant Streptococcus pneumoniae can be resensitized by targeting the mevalonate pathway as indicated by sCRilecs-seq',
                    authors: 'Liselot Dewachter, Julien Dénéréaz et al.',
                    journal: 'eLife',
                    doi: 'https://doi.org/10.7554/eLife.75607'
                },
                {
                    year: '2022',
                    title: 'CcrZ is a pneumococcal spatiotemporal cell cycle regulator that interacts with FtsZ and controls DNA replication by modulating the activity of DnaA',
                    authors: 'Clément Gallay, Stefano Sanselicio, [...], Julien Dénéréaz et al.',
                    journal: 'Nature Microbiology',
                    doi: 'https://doi.org/10.1038/s41564-021-00949-1'
                },
                {
                    year: '2022',
                    title: 'Fluorescent D-Amino Acids for Super-resolution Microscopy of the Bacterial Cell Wall',
                    authors: 'Chen Zhang, [...], Julien Dénéréaz et al.',
                    journal: 'ACS Chemical Biology',
                    doi: 'https://doi.org/10.1021/acschembio.2c00496'
                }
            ],
            teaching: [
                {
                    period: '2020 - 2021',
                    role: 'MSc Student Direct Supervisor',
                    course: 'Research Supervision',
                    institution: 'University of Lausanne - Veening Lab',
                    details: ['Elise Eray (2021)', 'Margaux Crézé (2020)']
                },
                {
                    period: '2019 - 2021',
                    role: 'Teaching Assistant',
                    course: 'Molecular Biology Practical Course, option Microbiology',
                    institution: 'University of Lausanne'
                },
                {
                    period: '2020 - 2022',
                    role: 'Teaching Assistant',
                    course: 'Practical course in biotic interactions',
                    institution: 'University of Lausanne'
                }
            ],
            conferences: [
                {
                    year: '2023',
                    name: 'EMBO | EMBL Symposium: New approaches and concepts in microbiology',
                    location: 'Heidelberg, Germany',
                    type: 'Poster and best poster prize'
                },
                {
                    year: '2022',
                    name: 'Gordon Research Conference: Bacterial Cell Surfaces',
                    location: 'Mount Snow, VT, USA',
                    type: 'Poster'
                },
                {
                    year: '2022',
                    name: 'Gordon Research Seminar: Bacterial Cell Surfaces',
                    location: 'Mount Snow, VT, USA',
                    type: 'Poster'
                },
                {
                    year: '2022',
                    name: 'Swiss Society of Microbiology: Annual congress',
                    location: 'Lausanne, Switzerland',
                    type: 'Poster'
                }
            ],
            hobbies: ['Skiing', 'Climbing', 'Video games', 'Hiking', 'Committee member for Biology Students\' Association (2016-2018)']
        };
    }
    init() {
        console.log('Data object:', this.data);
        console.log('Qualifications exist?', this.data.qualifications ? 'Yes' : 'No');
        this.setupProfilePhoto();
        this.renderSkills();
        this.renderExperience();
        this.renderProjects();
        this.renderEducation();
        this.renderLanguages();
        this.renderQualifications();
        this.renderPublications();
        this.renderTeaching();
        this.renderConferences();
        this.renderHobbies();
        this.addInteractivity();
        console.log('CV App initialized');
    }
    setupProfilePhoto() {
        const img = document.getElementById('profile-img');
        const placeholder = document.querySelector('.photo-placeholder');
        if (img && placeholder) {
            img.onload = () => {
                img.style.display = 'block';
                placeholder.style.display = 'none';
            };
            img.onerror = () => {
                img.style.display = 'none';
                placeholder.style.display = 'flex';
            };
        }
    }
    renderSkills() {
        const categories = ['languages', 'frameworks', 'tools'];
        const containerIds = ['languages-container', 'frameworks-container', 'tools-container'];
        categories.forEach((category, index) => {
            const container = document.getElementById(containerIds[index]);
            if (!container)
                return;
            const skills = this.data.skills.filter(skill => skill.category === category);
            skills.forEach(skill => {
                const skillElement = document.createElement('div');
                skillElement.className = 'skill-item';
                skillElement.textContent = skill.name;
                skillElement.dataset.category = skill.category;
                container.appendChild(skillElement);
            });
        });
    }
    renderExperience() {
        const container = document.getElementById('experience-container');
        if (!container)
            return;
        this.data.experience.forEach(exp => {
            const expElement = document.createElement('div');
            expElement.className = 'experience-item';
            expElement.innerHTML = `
        <div class="experience-header">
          <h3 class="job-title">${exp.title}</h3>
          <span class="job-period">${exp.period}</span>
        </div>
        <p class="company">${exp.company}</p>
        <ul class="job-description">
          ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
        </ul>
      `;
            container.appendChild(expElement);
        });
    }
    renderProjects() {
        const container = document.getElementById('projects-container');
        if (!container)
            return;
        this.data.projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-item';
            projectElement.innerHTML = `
        <div class="project-header">
          <h3 class="project-title">${project.title}</h3>
          <span class="project-period">${project.period}</span>
        </div>
        <p class="project-tech">${project.technologies}</p>
        <ul class="project-description">
          ${project.description.map(desc => `<li>${desc}</li>`).join('')}
        </ul>
      `;
            container.appendChild(projectElement);
        });
    }
    renderEducation() {
        const container = document.getElementById('education-container');
        if (!container)
            return;
        this.data.education.forEach(edu => {
            const eduElement = document.createElement('div');
            eduElement.className = 'education-item';
            let html = `
        <h3 class="degree">${edu.degree}</h3>
        <p class="school">${edu.school}</p>
        <span class="graduation-year">${edu.year}</span>
      `;
            if (edu.thesis) {
                html += `<p class="education-details"><strong>Thesis:</strong> ${edu.thesis}</p>`;
            }
            if (edu.advisor) {
                html += `<p class="education-details"><strong>Advisor:</strong> ${edu.advisor}</p>`;
            }
            eduElement.innerHTML = html;
            container.appendChild(eduElement);
        });
    }
    renderQualifications() {
        const container = document.getElementById('qualifications-container');
        if (!container) {
            console.error('qualifications-container not found');
            return;
        }
        console.log('Qualifications data:', this.data.qualifications);
        if (!this.data.qualifications || this.data.qualifications.length === 0) {
            console.error('No qualifications data found');
            return;
        }
        this.data.qualifications.forEach(qual => {
            const qualElement = document.createElement('div');
            qualElement.className = 'qualification-item';
            qualElement.innerHTML = `
        <h4 class="qualification-category">${qual.category}</h4>
        <p class="qualification-description">${qual.description}</p>
      `;
            container.appendChild(qualElement);
        });
    }
    renderPublications() {
        const container = document.getElementById('publications-container');
        if (!container)
            return;
        this.data.publications.forEach(pub => {
            const pubElement = document.createElement('div');
            pubElement.className = 'publication-item';
            let html = `
        <div class="publication-year">${pub.year}</div>
        <div class="publication-content">
          <p class="publication-authors">${pub.authors}</p>
          <p class="publication-title">${pub.title}</p>
          <p class="publication-journal">${pub.journal}</p>
      `;
            if (pub.doi) {
                html += `<p class="publication-doi"><a href="${pub.doi}" target="_blank">${pub.doi}</a></p>`;
            }
            html += `</div>`;
            pubElement.innerHTML = html;
            container.appendChild(pubElement);
        });
    }
    renderTeaching() {
        const container = document.getElementById('teaching-container');
        if (!container)
            return;
        this.data.teaching.forEach(teach => {
            const teachElement = document.createElement('div');
            teachElement.className = 'teaching-item';
            let html = `
        <div class="teaching-header">
          <h4 class="teaching-role">${teach.role}</h4>
          <span class="teaching-period">${teach.period}</span>
        </div>
        <p class="teaching-course">${teach.course}</p>
        <p class="teaching-institution">${teach.institution}</p>
      `;
            if (teach.details) {
                html += `<ul class="teaching-details">`;
                teach.details.forEach(detail => {
                    html += `<li>${detail}</li>`;
                });
                html += `</ul>`;
            }
            teachElement.innerHTML = html;
            container.appendChild(teachElement);
        });
    }
    renderConferences() {
        const container = document.getElementById('conferences-container');
        if (!container)
            return;
        this.data.conferences.forEach(conf => {
            const confElement = document.createElement('div');
            confElement.className = 'conference-item';
            confElement.innerHTML = `
        <div class="conference-year">${conf.year}</div>
        <div class="conference-content">
          <h4 class="conference-name">${conf.name}</h4>
          <p class="conference-location">${conf.location}</p>
          <p class="conference-type">${conf.type}</p>
        </div>
      `;
            container.appendChild(confElement);
        });
    }
    renderHobbies() {
        const container = document.getElementById('hobbies-container');
        if (!container)
            return;
        this.data.hobbies.forEach(hobby => {
            const hobbyElement = document.createElement('div');
            hobbyElement.className = 'hobby-item';
            hobbyElement.textContent = hobby;
            container.appendChild(hobbyElement);
        });
    }
    renderLanguages() {
        const container = document.getElementById('languages-spoken-container');
        if (!container)
            return;
        this.data.languages.forEach(lang => {
            const langElement = document.createElement('div');
            langElement.className = 'language-item';
            langElement.innerHTML = `
        <span class="language-name">${lang.name}</span>
        <span class="language-level">${lang.level}</span>
      `;
            container.appendChild(langElement);
        });
    }
    addInteractivity() {
        // Add smooth scrolling for better UX
        this.addSmoothScrolling();
        // Add skill hover effects
        this.addSkillEffects();
        // Add print functionality
        this.addPrintSupport();
    }
    addSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.hash);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    addSkillEffects() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                const category = skill.getAttribute('data-category');
                console.log(`Hovering over ${category} skill: ${skill.textContent}`);
            });
        });
    }
    addPrintSupport() {
        // Add keyboard shortcut for printing
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                window.print();
            }
        });
    }
}
// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new CVApp();
    app.init();
});
//# sourceMappingURL=main.js.map