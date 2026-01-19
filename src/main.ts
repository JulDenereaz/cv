interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

interface CVData {
  skills: Skill[];
}

class CVApp {
  private data: CVData;

  constructor() {
    this.data = {
      skills: [
        { name: 'TypeScript', category: 'frontend' },
        { name: 'JavaScript', category: 'frontend' },
        { name: 'React', category: 'frontend' },
        { name: 'HTML/CSS', category: 'frontend' },
        { name: 'Node.js', category: 'backend' },
        { name: 'Python', category: 'backend' },
        { name: 'Git', category: 'tools' },
        { name: 'Docker', category: 'tools' },
        { name: 'SQL', category: 'other' },
        { name: 'REST APIs', category: 'other' }
      ]
    };
  }

  public init(): void {
    this.renderSkills();
    this.addInteractivity();
    console.log('CV App initialized');
  }

  private renderSkills(): void {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) {
      console.error('Skills container not found');
      return;
    }

    const skillElements = this.data.skills.map(skill => {
      const skillElement = document.createElement('div');
      skillElement.className = 'skill-item';
      skillElement.textContent = skill.name;
      skillElement.dataset.category = skill.category;
      return skillElement;
    });

    skillElements.forEach(element => {
      skillsContainer.appendChild(element);
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