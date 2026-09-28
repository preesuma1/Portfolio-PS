document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       THEME + HANGING BULB
       ===================================================== */

    const html = document.documentElement;

    const themeToggle =
        document.getElementById("theme-toggle");


    /* Load saved theme */

    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme) {

        html.setAttribute(
            "data-theme",
            savedTheme
        );

    } else {

        html.setAttribute(
            "data-theme",
            "dark"
        );

    }


    /*
     * Hanging bulb interaction
     *
     * Click:
     * 1. Pull wire down
     * 2. Move bulb down
     * 3. Switch theme
     * 4. Return bulb and wire
     */

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            /* Prevent repeated clicks during animation */

            if (
                themeToggle.classList.contains("pulling")
            ) {
                return;
            }


            /* Start pull */

            themeToggle.classList.add("pulling");


            /* Change theme shortly after pull begins */

            setTimeout(() => {

                const currentTheme =
                    html.getAttribute("data-theme");


                const newTheme =
                    currentTheme === "light"
                        ? "dark"
                        : "light";


                html.setAttribute(
                    "data-theme",
                    newTheme
                );


                localStorage.setItem(
                    "theme",
                    newTheme
                );

            }, 130);


            /*
             * Release the bulb after the pull animation.
             */

            setTimeout(() => {

                themeToggle.classList.remove(
                    "pulling"
                );

            }, 380);

        });

    }



    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle =
        document.getElementById("menu-toggle");

    const navLinks =
        document.getElementById("nav-links");


    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle(
                    "active"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (
                    navLinks.classList.contains(
                        "active"
                    )
                ) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }
        );


        /*
         * Close mobile menu when
         * navigation link is clicked.
         */

        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "active"
                        );


                        const icon =
                            menuToggle.querySelector("i");


                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }
                );

            });

    }



    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "active"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        document.getElementById(
            "contact-form"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        ?.value
                        .trim();


                const email =
                    document
                        .getElementById("email")
                        ?.value
                        .trim();


                const subject =
                    document
                        .getElementById("subject")
                        ?.value
                        .trim();


                const message =
                    document
                        .getElementById("message")
                        ?.value
                        .trim();


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    alert(
                        "Please fill in your name, email and message."
                    );

                    return;

                }


                /*
                 * Confirm this email address
                 * before publishing the portfolio.
                 */

                const receiver =
                    "preesuma1@gmail.com";


                const mailSubject =
                    subject ||
                    `Portfolio Contact from ${name}`;


                const body =
                    `Name: ${name}\n` +
                    `Email: ${email}\n\n` +
                    `Message:\n${message}`;


                const mailtoURL =
                    `mailto:${receiver}` +
                    `?subject=${encodeURIComponent(
                        mailSubject
                    )}` +
                    `&body=${encodeURIComponent(
                        body
                    )}`;


                window.location.href =
                    mailtoURL;

            }
        );

    }



    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElement =
        document.getElementById(
            "current-year"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navItems =
        document.querySelectorAll(
            ".nav-links a"
        );


    const navObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const id =
                            entry.target.getAttribute(
                                "id"
                            );


                        navItems.forEach(link => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) === `#${id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(section => {

        navObserver.observe(section);

    });



    /* =====================================================
       SMOOTH ANCHOR SCROLL
       ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetID =
                        anchor.getAttribute(
                            "href"
                        );


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });

});

