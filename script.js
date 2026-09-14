/**
 * Digitally Win — Portfolio JavaScript Engine
 * Developer: Winlove U. Cadavos Jr. | Full-Stack Web Developer
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. PROJECT DATA & DYNAMIC FILTERING
  // =========================================================================

  const projects = [
    {
      id: "business-management-system",
      title: "Business Management System",
      category: "business-systems",
      categoryName: "Business Systems",
      description: "A complete business management platform with inventory tracking, employee administration, sales reports, and database integration.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      image: "Image/projectbusiness.png",
      liveUrl: "PASTE_PROJECT_LINK_HERE",
      githubUrl: "PASTE_GITHUB_LINK_HERE"
    },
    {
      id: "dance-booking-system",
      title: "Dance Booking System",
      category: "web-apps",
      categoryName: "Web Applications",
      description: "Online lesson booking application featuring user authentication, voucher redemption, and dynamic scheduling management.",
      technologies: ["Python", "MySQL", "JavaScript", "HTML5"],
      image: "Image/projectdance.png",
      liveUrl: "PASTE_PROJECT_LINK_HERE",
      githubUrl: "PASTE_GITHUB_LINK_HERE"
    },
    {
      id: "portfolio-website",
      title: "Portfolio Website",
      category: "websites",
      categoryName: "Websites",
      description: "Modern, responsive portfolio engineered for freelancers and developers, built with clean semantic HTML5, CSS3, and JavaScript.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      image: "Image/projectportfolio.png",
      liveUrl: "#home",
      githubUrl: "https://github.com/digitallywinc"
    }
  ];

  const projectGrid = document.getElementById("project-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  function renderProjects(category = "all") {
    if (!projectGrid) return;

    const filtered = category === "all"
      ? projects
      : projects.filter(p => p.category === category);

    if (filtered.length === 0) {
      projectGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
          <p style="color: var(--text-muted); font-size: 15px;">New ${category.replace('-', ' ')} projects are currently in development. Check back soon!</p>
        </div>
      `;
      return;
    }

    projectGrid.innerHTML = filtered.map(item => `
      <article class="project-card" data-category="${item.category}">
        <div class="project-img-box">
          <img src="${item.image}" alt="${item.title} interface screenshot" loading="lazy" />
          <span class="project-category-badge">${item.categoryName}</span>
        </div>
        <div class="project-content">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="tags">
            ${item.technologies.map(t => `<span>${t}</span>`).join("")}
          </div>
          <div class="project-links">
            <a href="${item.liveUrl}" class="project-btn live-btn" data-type="live" data-title="${item.title}" data-url="${item.liveUrl}">
              <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> View Project
            </a>
            <a href="${item.githubUrl}" class="project-btn github-btn" data-type="github" data-title="${item.title}" data-url="${item.githubUrl}">
              <i class="fab fa-github" aria-hidden="true"></i> View Code
            </a>
          </div>
        </div>
      </article>
    `).join("");

    attachProjectButtonHandlers();
  }

  // Filter button click event
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const category = btn.getAttribute("data-filter");
      renderProjects(category);
    });
  });

  // Modal notice for placeholder project links
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalMessage = document.getElementById("modal-message");
  const modalClose = document.getElementById("modal-close");
  const modalOkBtn = document.getElementById("modal-ok-btn");

  function openModal(msg) {
    if (modalMessage) modalMessage.innerHTML = msg;
    if (modalBackdrop) modalBackdrop.removeAttribute("hidden");
  }

  function closeModal() {
    if (modalBackdrop) modalBackdrop.setAttribute("hidden", "");
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalOkBtn) modalOkBtn.addEventListener("click", closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  function attachProjectButtonHandlers() {
    document.querySelectorAll(".project-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const url = btn.getAttribute("data-url") || btn.getAttribute("href");
        const title = btn.getAttribute("data-title") || "This project";
        const type = btn.getAttribute("data-type") || "link";

        if (!url || url.includes("PASTE_PROJECT_LINK_HERE") || url.includes("PASTE_GITHUB_LINK_HERE")) {
          e.preventDefault();
          openModal(`
            <strong>${title}</strong><br><br>
            The ${type === "github" ? "GitHub repository" : "project URL"} is currently set to placeholder. You can insert your live URL in the <code>projects</code> data array in <code>script.js</code>.
          `);
        } else if (url.startsWith("#")) {
          // Internal anchor link, allowed
        } else {
          // Valid external URL
          btn.setAttribute("target", "_blank");
          btn.setAttribute("rel", "noopener noreferrer");
        }
      });
    });
  }

  // Initial render
  renderProjects("all");

  // =========================================================================
  // 2. MOBILE NAVIGATION & STICKY HEADER
  // =========================================================================

  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  const header = document.getElementById("header");

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!isExpanded));
      menu.classList.toggle("show");
      menuBtn.innerHTML = isExpanded 
        ? '<i class="fas fa-bars" aria-hidden="true"></i>' 
        : '<i class="fas fa-xmark" aria-hidden="true"></i>';
    });

    // Close menu when clicking any navigation link
    document.querySelectorAll("#menu a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
      });
    });
  }

  // Sticky Header
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("sticky");
    } else {
      header?.classList.remove("sticky");
    }
  });

  // Active Navigation on Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop - 120;
      const secId = sec.getAttribute("id");

      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${secId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);

  // =========================================================================
  // 3. SCROLL-TO-TOP BUTTON
  // =========================================================================

  const scrollTopBtn = document.getElementById("scroll-top");

  window.addEventListener("scroll", () => {
    if (!scrollTopBtn) return;
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  // =========================================================================
  // 4. INTERSECTION OBSERVER ANIMATIONS
  // =========================================================================

  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-animation");
        animObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  document.querySelectorAll(
    ".service-card, .skill-category-card, .why-card, .stat-card, .info-box, .testimonial-card, .contact-item"
  ).forEach(el => {
    el.classList.add("hidden-animation");
    animObserver.observe(el);
  });

  // =========================================================================
  // 5. INTERACTIVE CONTACT FORM VALIDATION & AJAX SUBMIT
  // =========================================================================

  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const submitBtn = document.getElementById("submit-btn");
  const formFeedback = document.getElementById("form-feedback");
  const formFeedbackText = document.getElementById("form-feedback-text");

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
  }

  function setFieldError(input, errorElementId, message) {
    const parent = input.closest(".input-box");
    const errorEl = document.getElementById(errorElementId);
    if (parent) parent.classList.add("has-error");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = "block";
    }
  }

  function clearFieldError(input, errorElementId) {
    const parent = input.closest(".input-box");
    const errorEl = document.getElementById(errorElementId);
    if (parent) parent.classList.remove("has-error");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.style.display = "none";
    }
  }

  // Clear errors on user input
  if (nameInput) nameInput.addEventListener("input", () => clearFieldError(nameInput, "name-error"));
  if (emailInput) emailInput.addEventListener("input", () => clearFieldError(emailInput, "email-error"));
  if (subjectInput) subjectInput.addEventListener("input", () => clearFieldError(subjectInput, "subject-error"));
  if (messageInput) messageInput.addEventListener("input", () => clearFieldError(messageInput, "message-error"));

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        setFieldError(nameInput, "name-error", "Please enter your name.");
        isValid = false;
      } else {
        clearFieldError(nameInput, "name-error");
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        setFieldError(emailInput, "email-error", "Please enter your email address.");
        isValid = false;
      } else if (!validateEmail(emailInput.value)) {
        setFieldError(emailInput, "email-error", "Please enter a valid email address.");
        isValid = false;
      } else {
        clearFieldError(emailInput, "email-error");
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        setFieldError(subjectInput, "subject-error", "Please enter a subject.");
        isValid = false;
      } else {
        clearFieldError(subjectInput, "subject-error");
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        setFieldError(messageInput, "message-error", "Please write a message.");
        isValid = false;
      } else if (messageInput.value.trim().length < 8) {
        setFieldError(messageInput, "message-error", "Please provide a little more detail (at least 8 characters).");
        isValid = false;
      } else {
        clearFieldError(messageInput, "message-error");
      }

      if (!isValid) {
        const firstError = contactForm.querySelector(".has-error input, .has-error textarea");
        if (firstError) firstError.focus();
        return;
      }

      // Submit via FormSubmit AJAX endpoint
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...';

      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim(),
        _subject: `Portfolio Inquiry: ${subjectInput.value.trim()}`,
        _captcha: "false"
      };

      try {
        const response = await fetch("https://formsubmit.co/ajax/digitally.winc@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          formFeedback.classList.remove("error");
          formFeedbackText.textContent = "Message sent successfully. I'll get back to you as soon as possible.";
          formFeedback.removeAttribute("hidden");
          contactForm.reset();
        } else {
          // Fallback if FormSubmit rejects AJAX
          contactForm.submit();
          return;
        }
      } catch (err) {
        // Fallback to standard form submission if offline or network blocked
        contactForm.submit();
        return;
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }

  // =========================================================================
  // 6. PORTFOLIO JAVASCRIPT ASSISTANT ("ASK ABOUT MY WORK")
  // =========================================================================

  const assistantToggle = document.getElementById("assistant-toggle");
  const assistantPanel = document.getElementById("assistant-panel");
  const assistantClose = document.getElementById("assistant-close");
  const assistantForm = document.getElementById("assistant-form");
  const assistantInput = document.getElementById("assistant-input");
  const assistantMessages = document.getElementById("assistant-messages");
  const suggestionChips = document.querySelectorAll(".chip");

  if (assistantToggle && assistantPanel) {
    assistantToggle.addEventListener("click", () => {
      const isHidden = assistantPanel.hasAttribute("hidden");
      if (isHidden) {
        assistantPanel.removeAttribute("hidden");
        assistantToggle.setAttribute("aria-expanded", "true");
        assistantInput?.focus();
      } else {
        assistantPanel.setAttribute("hidden", "");
        assistantToggle.setAttribute("aria-expanded", "false");
      }
    });

    assistantClose?.addEventListener("click", () => {
      assistantPanel.setAttribute("hidden", "");
      assistantToggle.setAttribute("aria-expanded", "false");
    });
  }

  // Knowledge base responses (Frontend JS only — No external API keys)
  const assistantKnowledge = [
    {
      keywords: ["tell me about winlove", "who", "about", "winlove", "cadavos", "background", "bio"],
      response: "Winlove U. Cadavos Jr. is a <strong>Full-Stack Web Developer</strong> based in Cavite, Philippines. He specializes in building responsive websites, modern web applications, and database-driven business management systems that help organizations run smoothly and grow online."
    },
    {
      keywords: ["what services do you offer", "services", "offer", "build", "what can you do"],
      response: "Winlove offers 8 core development services:<br>1. <strong>Full-Stack Web Development</strong><br>2. <strong>Front-End Development</strong><br>3. <strong>Back-End Development</strong><br>4. <strong>Responsive Website Development</strong><br>5. <strong>Web Application Development</strong><br>6. <strong>Business System Development</strong><br>7. <strong>AI-Assisted Development</strong><br>8. <strong>Automation & API Integration</strong>"
    },
    {
      keywords: ["what projects have you built", "project", "projects", "built", "work", "portfolio", "sample"],
      response: "Key projects include:<br>• <strong>Business Management System</strong> (PHP, MySQL inventory & staff platform)<br>• <strong>Dance Booking System</strong> (Python, MySQL lesson scheduling & vouchers)<br>• <strong>Portfolio Website</strong> (Modern responsive developer portfolio)<br>Check the <a href='#projects'>Projects section</a> above for screenshots and details!"
    },
    {
      keywords: ["what technologies do you use", "technologies", "tech", "stack", "skills", "languages", "tools"],
      response: "Winlove's core tech stack includes:<br>• <strong>Frontend:</strong> HTML5, CSS3, JavaScript (ES6+), Bootstrap<br>• <strong>Backend:</strong> PHP, Python<br>• <strong>Databases:</strong> MySQL, Relational Database Architecture<br>• <strong>Tools:</strong> Git & GitHub, VS Code, Figma"
    },
    {
      keywords: ["are you available for freelance work", "freelance", "available", "availability", "hire", "hiring"],
      response: "Yes! Winlove is currently <strong>available for freelance work, web development contracts, and business system projects</strong>. You can click 'Hire Me' or head down to the <a href='#contact'>Contact section</a> to discuss your project."
    },
    {
      keywords: ["how can i contact you", "contact", "email", "phone", "reach", "message", "touch"],
      response: "You can get in touch directly via:<br>• <strong>Email:</strong> <a href='mailto:digitally.winc@gmail.com'>digitally.winc@gmail.com</a><br>• <strong>Phone:</strong> <a href='tel:+639814587574'>+63 981 458 7574</a><br>• <strong>Location:</strong> Cavite, Philippines<br>Or send a message through the <a href='#contact'>Contact form</a> below!"
    },
    {
      keywords: ["resume", "cv", "download"],
      response: "You can view Winlove's official resume on OneDrive: <a href='https://1drv.ms/w/c/412e57f0f9f08225/IQDE1f0tXMM7ToEwZkwwUn41AZwbZPbGVcps-TtWuzG55GM?e=T6mdfj' target='_blank' rel='noopener noreferrer'>View Resume</a>."
    }
  ];

  function getAssistantAnswer(query) {
    const cleanQuery = query.toLowerCase().trim();

    for (const item of assistantKnowledge) {
      if (item.keywords.some(k => cleanQuery.includes(k))) {
        return item.response;
      }
    }

    return "Thanks for your question! Winlove is a Full-Stack Web Developer who builds modern websites, web applications, and custom business systems. Feel free to ask about his services, projects, tech stack, availability, or send a message directly through the <a href='#contact'>Contact Form</a>.";
  }

  function appendAssistantMessage(text, sender = "bot") {
    if (!assistantMessages) return;

    const msgDiv = document.createElement("div");
    msgDiv.className = `assistant-msg ${sender}`;

    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.innerHTML = text;

    msgDiv.appendChild(bubble);
    assistantMessages.appendChild(msgDiv);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  }

  function handleUserQuery(query) {
    if (!query || !query.trim()) return;

    appendAssistantMessage(query.trim(), "user");
    if (assistantInput) assistantInput.value = "";

    // Show bot typing indicator
    const typingDiv = document.createElement("div");
    typingDiv.className = "assistant-msg bot typing";
    typingDiv.innerHTML = '<div class="msg-bubble"><i class="fas fa-ellipsis fa-fade"></i></div>';
    assistantMessages.appendChild(typingDiv);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;

    setTimeout(() => {
      typingDiv.remove();
      const answer = getAssistantAnswer(query);
      appendAssistantMessage(answer, "bot");
    }, 350);
  }

  if (assistantForm && assistantInput) {
    assistantForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleUserQuery(assistantInput.value);
    });
  }

  suggestionChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const q = chip.getAttribute("data-query");
      handleUserQuery(q);
    });
  });

  // =========================================================================
  // 7. CURRENT YEAR DYNAMIC UPDATE
  // =========================================================================

  const copyrightYear = new Date().getFullYear();
  const copyrightEl = document.querySelector(".copyright");
  if (copyrightEl) {
    copyrightEl.innerHTML = `© ${copyrightYear} Digitally Win. All Rights Reserved.`;
  }
});