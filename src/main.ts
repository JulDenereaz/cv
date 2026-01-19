interface Skill {
  name: string;
  category: 'languages' | 'frameworks' | 'tools';
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

interface Project {
  title: string;
  technologies: string;
  period: string;
  description: string[];
}

interface Education {
  degree: string;
  school: string;
  year: string;
  details?: string;
}

interface Language {
  name: string;
  level: string;
}

interface CVData {
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  languages: Language[];
}

class CVApp {
  private data: CVData;

  constructor() {
    this.data = {
      skills: [
        // Programming Languages
        { name: 'Python', category: 'languages' },
        { name: 'R', category: 'languages' },
        { name: 'PHP', category: 'languages' },
        { name: 'SQL', category: 'languages' },
        { name: 'JavaScript', category: 'languages' },
        { name: 'Bash/Shell', category: 'languages' },
        
        // Frameworks & Libraries
        { name: 'Bioinformatics Pipelines', category: 'frameworks' },
        { name: 'Data Analysis Libraries', category: 'frameworks' },
        { name: 'REST APIs', category: 'frameworks' },
        { name: 'Statistical Modeling', category: 'frameworks' },
        { name: 'Machine Learning', category: 'frameworks' },
        { name: 'Full-Stack Development', category: 'frameworks' },
        
        // Tools & Technologies
        { name: 'Next-Generation Sequencing (NGS)', category: 'tools' },
        { name: 'CRISPR/CRISPRi-Seq', category: 'tools' },
        { name: 'Genomic Data Analysis', category: 'tools' },
        { name: 'MySQL', category: 'tools' },
        { name: 'Data Visualization', category: 'tools' },
        { name: 'Linux', category: 'tools' },
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
          details: 'Thesis: Genome-wide genetic interaction networks: from methods to insights into the pneumococcal cell cycle. Specialized in Bioinformatics, Microbiology, and Next-Generation Sequencing (NGS)'
        },
        {
          degree: 'Master of Science - Microbiology, General',
          school: 'University of Lausanne (UNIL)',
          year: '2017 - 2019',
          details: 'Master Thesis: Characterizing new pneumococcal cell division proteins'
        },
        {
          degree: 'Bachelor of Science - Microbiology, General',
          school: 'University of Lausanne (UNIL)',
          year: '2013 - 2017'
        }
      ],
      languages: [
        { name: 'French', level: 'Native' },
        { name: 'English', level: 'Fluent' },
        { name: 'German', level: 'Conversational' },
        { name: 'Italian', level: 'Basic' }
      ]
    };
  }

  public init(): void {
    this.renderSkills();
    this.renderExperience();
    this.renderProjects();
    this.renderEducation();
    this.renderLanguages();
    this.addInteractivity();
    console.log('CV App initialized');
  }

  private renderSkills(): void {
    const categories = ['languages', 'frameworks', 'tools'];
    const containerIds = ['languages-container', 'frameworks-container', 'tools-container'];

    categories.forEach((category, index) => {
      const container = document.getElementById(containerIds[index]);
      if (!container) return;

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

  private renderExperience(): void {
    const container = document.getElementById('experience-container');
    if (!container) return;

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

  private renderProjects(): void {
    const container = document.getElementById('projects-container');
    if (!container) return;

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

  private renderEducation(): void {
    const container = document.getElementById('education-container');
    if (!container) return;

    this.data.education.forEach(edu => {
      const eduElement = document.createElement('div');
      eduElement.className = 'education-item';
      
      eduElement.innerHTML = `
        <h3 class="degree">${edu.degree}</h3>
        <p class="school">${edu.school}</p>
        <span class="graduation-year">${edu.year}</span>
        ${edu.details ? `<p class="education-details">${edu.details}</p>` : ''}
      `;
      
      container.appendChild(eduElement);
    });
  }

  private renderLanguages(): void {
    const container = document.getElementById('languages-spoken-container');
    if (!container) return;

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

  private addInteractivity(): void {
    // Add smooth scrolling for better UX
    this.addSmoothScrolling();
    
    // Add skill hover effects
    this.addSkillEffects();
    
    // Add print functionality
    this.addPrintSupport();
  }

  private addSmoothScrolling(): void {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector((link as HTMLAnchorElement).hash);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }

  private addSkillEffects(): void {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(skill => {
      skill.addEventListener('mouseenter', () => {
        const category = skill.getAttribute('data-category');
        console.log(`Hovering over ${category} skill: ${skill.textContent}`);
      });
    });
  }

  private addPrintSupport(): void {
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