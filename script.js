document.addEventListener("DOMContentLoaded", () => {

/* =========================================================
   NAVBAR
   HERO PAR VISIBLE
   HERO KE BAAD HIDDEN
   TOP PAR MOUSE AAYE TO SHOW
========================================================= */

const navbar = document.querySelector(".navbar");
const heroSection = document.querySelector(".hero");

const TOP_ZONE = 80;

let cursorInTopZone = false;


function updateNavbar() {

    if (!navbar) return;


    /* =========================================
       HERO ABHI SCREEN PAR HAI
       Navbar visible rahe
    ========================================= */

    if (
        heroSection &&
        heroSection.getBoundingClientRect().bottom > 0
    ) {

        navbar.classList.remove("navbar-hidden");

        return;
    }


    /* =========================================
       HERO SE NEECHE AA GAYE
       Sirf cursor top par ho to navbar show
    ========================================= */

    if (cursorInTopZone) {

        navbar.classList.remove("navbar-hidden");

    } else {

        navbar.classList.add("navbar-hidden");

    }

}


/* =========================================
   SCROLL
========================================= */

window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);


/* =========================================
   MOUSE TOP AREA
========================================= */

window.addEventListener(
    "mousemove",
    (event) => {

        const inTopZone =
            event.clientY <= TOP_ZONE;


        if (inTopZone !== cursorInTopZone) {

            cursorInTopZone = inTopZone;

            updateNavbar();

        }

    }
);


/* =========================================
   MOUSE WEBSITE SE BAHAR
========================================= */

document.addEventListener(
    "mouseleave",
    () => {

        cursorInTopZone = false;

        updateNavbar();

    }
);


/* =========================================
   INITIAL
========================================= */

updateNavbar();



    /* =========================================================
       NORMAL DRAGGABLE OBJECTS
    ========================================================= */

    const draggableObjects =
        document.querySelectorAll(".draggable-object");

    draggableObjects.forEach((object) => {

        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        object.addEventListener("pointerdown", (e) => {

            e.preventDefault();

            isDragging = true;

            startX = e.clientX;
            startY = e.clientY;

            object.setPointerCapture(e.pointerId);
            object.classList.add("dragging");

        });

        object.addEventListener("pointermove", (e) => {

            if (!isDragging) return;

            const moveX = e.clientX - startX;
            const moveY = e.clientY - startY;

            currentX += moveX;
            currentY += moveY;

            object.style.setProperty(
                "--drag-x",
                `${currentX}px`
            );

            object.style.setProperty(
                "--drag-y",
                `${currentY}px`
            );

            startX = e.clientX;
            startY = e.clientY;

        });

        object.addEventListener("pointerup", (e) => {

            if (!isDragging) return;

            isDragging = false;

            object.classList.remove("dragging");

            try {
                object.releasePointerCapture(e.pointerId);
            } catch (error) {}

        });

        object.addEventListener("pointercancel", () => {

            isDragging = false;
            object.classList.remove("dragging");

        });

    });


    /* =========================================================
       CLOUDS
    ========================================================= */

    const clouds =
        document.querySelectorAll(".cloud");

    clouds.forEach((cloud) => {

        let isDragging = false;

        let startX = 0;
        let startY = 0;

        let moveX = 0;
        let moveY = 0;

        cloud.addEventListener("pointerdown", (e) => {

            e.preventDefault();

            isDragging = true;

            startX = e.clientX;
            startY = e.clientY;

            cloud.classList.add("dragging");

            cloud.setPointerCapture(e.pointerId);

        });

        cloud.addEventListener("pointermove", (e) => {

            if (!isDragging) return;

            moveX = e.clientX - startX;
            moveY = e.clientY - startY;

            cloud.style.setProperty(
                "--cloud-x",
                `${moveX}px`
            );

            cloud.style.setProperty(
                "--cloud-y",
                `${moveY}px`
            );

        });

        function returnCloud() {

            cloud.classList.remove("dragging");

            cloud.style.transition =
                "transform 0.7s cubic-bezier(0.16,1,0.3,1)";

            cloud.style.setProperty(
                "--cloud-x",
                "0px"
            );

            cloud.style.setProperty(
                "--cloud-y",
                "0px"
            );

            setTimeout(() => {
                cloud.style.transition = "";
            }, 750);

        }

        cloud.addEventListener("pointerup", (e) => {

            if (!isDragging) return;

            isDragging = false;

            try {
                cloud.releasePointerCapture(e.pointerId);
            } catch (error) {}

            returnCloud();

        });

        cloud.addEventListener("pointercancel", () => {

            isDragging = false;

            returnCloud();

        });

    });


    /* =========================================================
       HERO — CREATIVE MARKETING LETTER BY LETTER
    ========================================================= */

    const heroText =
        document.getElementById("heroText");

    if (heroText) {

        heroText.innerHTML = "";

        const lines = [
            "Creative",
            "Marketing"
        ];

        let delay = 0;

        lines.forEach((text) => {

            const line =
                document.createElement("div");

            line.classList.add("hero-line");

            for (let i = 0; i < text.length; i++) {

                const span =
                    document.createElement("span");

                span.classList.add("letter");

                span.textContent = text[i];

                span.style.animationDelay =
                    `${delay}s`;

                line.appendChild(span);

                delay += 0.08;

            }

            heroText.appendChild(line);

            delay += 0.15;

        });

    }


    /* =========================================================
       TV SECTION — SHADOW
    ========================================================= */

    const tvSection =
        document.querySelector(".tv-section");

    const tvImage =
        document.getElementById("tvImage");

    const tvWrapper =
        document.getElementById("tvWrapper");

    const tvVideo =
        document.getElementById("tvVideo");

    if (
        tvSection &&
        tvImage &&
        tvVideo
    ) {

        function updateTVBackground() {

            const rect =
                tvSection.getBoundingClientRect();

            const windowHeight =
                window.innerHeight;

            const isLight =
                rect.bottom <= windowHeight * 0.35;

            tvImage.style.filter = isLight
                ?
                `
                drop-shadow(
                    0 20px 18px
                    rgba(0,0,0,0.25)
                )
                `
                :
                `
                drop-shadow(
                    0 30px 22px
                    rgba(0,0,0,0.65)
                )
                `;

        }

        updateTVBackground();

        window.addEventListener(
            "scroll",
            updateTVBackground,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateTVBackground
        );

    }


    /* =========================================================
       THIRD PAGE — MESSAGE
    ========================================================= */

    const messageSection =
        document.querySelector(".message-section");

    const bigMessage =
        document.getElementById("bigMessage");

    if (
        messageSection &&
        bigMessage
    ) {

        const originalText = [
            "Pixels don't just make",
            "THINGS LOOK GOOD.",
            "WE FIGURE OUT WHAT",
            "THEY NEED TO SAY."
        ];

        bigMessage.innerHTML = "";

        originalText.forEach((text) => {

            const line =
                document.createElement("span");

            line.className =
                "message-line";

            line.style.opacity = "1";
            line.style.clipPath = "none";
            line.style.transform =
                "translateY(0)";

            const words =
                text.split(" ");

            words.forEach((word, index) => {

                const wordSpan =
                    document.createElement("span");

                wordSpan.className =
                    "message-word";

                wordSpan.textContent =
                    word;

                wordSpan.style.color =
                    "#b8b8b8";

                wordSpan.style.transition =
                    "color 0.50s linear";

                line.appendChild(wordSpan);

                if (
                    index <
                    words.length - 1
                ) {

                    line.appendChild(
                        document.createTextNode(" ")
                    );

                }

            });

            bigMessage.appendChild(line);

        });


        const messageLines =
            bigMessage.querySelectorAll(
                ".message-line"
            );

        const messageWords =
            bigMessage.querySelectorAll(
                ".message-word"
            );


        /* =====================================================
           STICKERS
        ===================================================== */

        const think =
            document.querySelector(".think");

        const make =
            document.querySelector(".make");

        const grow =
            document.querySelector(".grow");

        const stickers = [
            think,
            make,
            grow
        ];

        const stickerLineMap = [
            think,
            make,
            null,
            grow
        ];


        let pageVisible = false;

        let ticking = false;


        /* =====================================================
           RESET MESSAGE
        ===================================================== */

        function resetMessagePage() {

            messageWords.forEach((word) => {

                word.style.color =
                    "#d1cece";

            });

            stickers.forEach((sticker) => {

                if (!sticker) return;

                sticker.getAnimations()
                    .forEach((animation) => {
                        animation.cancel();
                    });

                sticker.style.opacity = "0";

                sticker.style.transform =
                    "translateY(-500px) rotate(0deg)";

            });

        }


        /* =====================================================
           MESSAGE SCROLL
        ===================================================== */

        function updateMessageScroll() {

            if (!pageVisible) return;

            const rect =
                messageSection.getBoundingClientRect();

            const viewportHeight =
                window.innerHeight;

            let start;
            let end;


            if (window.innerWidth <= 600) {

                start =
                    viewportHeight * 0.90;

                const halfPage =
                    messageSection.offsetHeight / 2;

                end =
                    viewportHeight - halfPage;

                if (end >= start) {

                    end =
                        start -
                        viewportHeight * 0.45;

                }

            }

            else {

                start =
                    viewportHeight * 0.205;

                end =
                    -viewportHeight * 0.15;

            }


            let progress =
                (
                    start - rect.top
                ) /
                (
                    start - end
                );

            progress =
                Math.max(
                    0,
                    Math.min(
                        1,
                        progress
                    )
                );


            const totalWords =
                messageWords.length;

            const wordPosition =
                progress * totalWords;


            messageWords.forEach((word, index) => {

                let wordProgress =
                    wordPosition - index;

                wordProgress =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            wordProgress
                        )
                    );

                const eased =
                    wordProgress *
                    wordProgress *
                    (
                        3 -
                        2 * wordProgress
                    );

                const value =
                    Math.round(
                        184 -
                        (
                            179 *
                            eased
                        )
                    );

                word.style.color =
                    `rgb(${value},${value},${value})`;

            });


            messageLines.forEach(
                (line, lineIndex) => {

                    const lineWords =
                        line.querySelectorAll(
                            ".message-word"
                        );

                    if (!lineWords.length)
                        return;

                    const firstWord =
                        Array.from(
                            messageWords
                        ).indexOf(
                            lineWords[0]
                        );

                    const sticker =
                        stickerLineMap[lineIndex];

                    if (!sticker) return;

                    let stickerProgress =
                        wordPosition -
                        (
                            firstWord +
                            lineWords.length -
                            1
                        );

                    stickerProgress =
                        Math.max(
                            0,
                            Math.min(
                                1,
                                stickerProgress
                            )
                        );

                    const y =
                        -500 +
                        (
                            500 *
                            stickerProgress
                        );

                    sticker.style.opacity =
                        stickerProgress;

                    let rotation = 0;

                    if (sticker === think) {
                        rotation = -6;
                    }

                    else if (sticker === make) {
                        rotation = 12;
                    }

                    else if (sticker === grow) {
                        rotation = -10;
                    }

                    sticker.style.transform =
                        `translateY(${y}px) rotate(${rotation}deg)`;

                }
            );

        }


        function handleMessageScroll() {

            if (ticking) return;

            ticking = true;

            requestAnimationFrame(() => {

                updateMessageScroll();

                ticking = false;

            });

        }

        window.addEventListener(
            "scroll",
            handleMessageScroll,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateMessageScroll
        );


        const messageObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            if (!pageVisible) {

                                pageVisible = true;

                                resetMessagePage();

                                updateMessageScroll();

                            }

                        }

                        else {

                            pageVisible = false;

                            resetMessagePage();

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        messageObserver.observe(
            messageSection
        );

    }


    /* =========================================================
       FOURTH PAGE — TOOLS
    ========================================================= */

    const toolsSection =
        document.querySelector(".tools-section");

    if (toolsSection) {

        const toolsObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            toolsSection.classList.remove(
                                "tools-active"
                            );

                            void toolsSection.offsetWidth;

                            toolsSection.classList.add(
                                "tools-active"
                            );

                        }

                        else {

                            toolsSection.classList.remove(
                                "tools-active"
                            );

                        }

                    });

                },
                {
                    threshold: 0.35
                }
            );

        toolsObserver.observe(
            toolsSection
        );

    }


    /* =========================================================
       STORY CAROUSEL
    ========================================================= */

    const storySection =
        document.querySelector(".story-section");

    const storyImages =
        document.querySelectorAll(".story-image");

    const storyPrev =
        document.querySelector(".story-prev");

    const storyNext =
        document.querySelector(".story-next");

    if (
        storySection &&
        storyImages.length
    ) {

        let storyCurrent = 2;

        let storyAudioUnlocked = false;


        function playCurrentStoryVideo() {

            storyImages.forEach((image, index) => {

                const video =
                    image.querySelector("video");

                if (!video) return;

                if (index === storyCurrent) {

                    video.currentTime = 0;

                    video.muted =
                        !storyAudioUnlocked;

                    video.volume = 1;

                    video.play().catch(() => {});

                }

                else {

                    video.pause();

                    video.currentTime = 0;

                    video.muted = true;

                }

            });

        }


        function updateStoryCarousel() {

            const total =
                storyImages.length;

            storyImages.forEach(
                (image, index) => {

                    let position =
                        index -
                        storyCurrent;

                    if (
                        position >
                        total / 2
                    ) {

                        position -= total;

                    }

                    if (
                        position <
                        -total / 2
                    ) {

                        position += total;

                    }


                    if (position === 0) {

                        image.style.transform =
                            "translateX(0) scale(1)";

                        image.style.filter =
                            "blur(0px)";

                        image.style.opacity = "1";

                        image.style.zIndex = "10";

                    }

                    else if (position === -1) {

                        image.style.transform =
                            "translateX(-155px) scale(.94)";

                        image.style.filter =
                            "blur(2px)";

                        image.style.opacity = ".82";

                        image.style.zIndex = "5";

                    }

                    else if (position === 1) {

                        image.style.transform =
                            "translateX(155px) scale(.94)";

                        image.style.filter =
                            "blur(2px)";

                        image.style.opacity = ".82";

                        image.style.zIndex = "5";

                    }

                    else if (position === -2) {

                        image.style.transform =
                            "translateX(-285px) scale(.85)";

                        image.style.filter =
                            "blur(3px)";

                        image.style.opacity = ".72";

                        image.style.zIndex = "2";

                    }

                    else if (position === 2) {

                        image.style.transform =
                            "translateX(285px) scale(.85)";

                        image.style.filter =
                            "blur(3px)";

                        image.style.opacity = ".72";

                        image.style.zIndex = "2";

                    }

                    else {

                        image.style.transform =
                            "translateX(400px) scale(.7)";

                        image.style.filter =
                            "blur(6px)";

                        image.style.opacity = "0";

                        image.style.zIndex = "0";

                    }

                }
            );

            playCurrentStoryVideo();

        }


        function nextStoryImage() {

            storyCurrent++;

            if (
                storyCurrent >=
                storyImages.length
            ) {

                storyCurrent = 0;

            }

            updateStoryCarousel();

        }


        function previousStoryImage() {

            storyCurrent--;

            if (storyCurrent < 0) {

                storyCurrent =
                    storyImages.length - 1;

            }

            updateStoryCarousel();

        }


        storyImages.forEach((image) => {

            const video =
                image.querySelector("video");

            if (!video) return;

            video.addEventListener(
                "ended",
                () => {

                    if (
                        storyImages[
                            storyCurrent
                        ] === image
                    ) {

                        nextStoryImage();

                    }

                }
            );

        });


        storySection.addEventListener(
            "pointerdown",
            () => {

                if (!storyAudioUnlocked) {

                    storyAudioUnlocked = true;

                    playCurrentStoryVideo();

                }

            }
        );


        if (storyNext) {

            storyNext.addEventListener(
                "click",
                () => {

                    storyAudioUnlocked = true;

                    nextStoryImage();

                }
            );

        }


        if (storyPrev) {

            storyPrev.addEventListener(
                "click",
                () => {

                    storyAudioUnlocked = true;

                    previousStoryImage();

                }
            );

        }


        const storyObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            playCurrentStoryVideo();

                        }

                        else {

                            storyImages.forEach(
                                (image) => {

                                    const video =
                                        image.querySelector(
                                            "video"
                                        );

                                    if (video) {
                                        video.pause();
                                    }

                                }
                            );

                        }

                    });

                },
                {
                    threshold: 0.35
                }
            );

        storyObserver.observe(
            storySection
        );


        document.addEventListener(
            "visibilitychange",
            () => {

                if (document.hidden) {

                    storyImages.forEach(
                        (image) => {

                            const video =
                                image.querySelector(
                                    "video"
                                );

                            if (video) {
                                video.pause();
                            }

                        }
                    );

                }

                else {

                    const rect =
                        storySection.getBoundingClientRect();

                    const isStoryVisible =
                        rect.top <
                            window.innerHeight &&
                        rect.bottom > 0;

                    if (isStoryVisible) {

                        playCurrentStoryVideo();

                    }

                }

            }
        );


        updateStoryCarousel();

    }


    /* =========================================================
       SOLID PAGE BACKGROUND TRANSITIONS
    ========================================================= */

    const backgroundTransitions = [

        {
            section:
                document.querySelector(
                    ".tv-section"
                ),
            color:
                "#f3f1ec"
        },

        {
            section:
                document.querySelector(
                    ".message-section"
                ),
            color:
                "#050505"
        },

        {
            section:
                document.querySelector(
                    ".tools-section"
                ),
            color:
                "#f3f1ec"
        },

        {
            section:
                document.querySelector(
                    ".story-section"
                ),
            color:
                "#000"
        }

    ];


    function updateBackgroundTransition() {

        const vh =
            window.innerHeight;

        backgroundTransitions.forEach(
            ({ section, color }) => {

                if (!section) return;

                const rect =
                    section.getBoundingClientRect();

                const start =
                    vh * 0.80;

                const end =
                    vh * 0.05;

                let progress =
                    (
                        start -
                        rect.bottom
                    ) /
                    (
                        start -
                        end
                    );

                progress =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            progress
                        )
                    );

                progress =
                    progress *
                    progress *
                    (
                        3 -
                        2 * progress
                    );

                section.style.setProperty(
                    "--bg-reveal",
                    `${(
                        progress * 100
                    ).toFixed(3)}%`
                );

                section.style.setProperty(
                    "--next-bg",
                    color
                );

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateBackgroundTransition,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateBackgroundTransition
    );

    updateBackgroundTransition();


    /* =========================================================
       CREATIVE STICKERS DRAG
    ========================================================= */

    const creativeStickers =
        document.querySelectorAll(
            ".creative-sticker"
        );


    creativeStickers.forEach((sticker) => {

        let isDragging = false;

        let startX = 0;
        let startY = 0;

        let currentX = 0;
        let currentY = 0;


        sticker.addEventListener(
            "pointerdown",
            (e) => {

                e.preventDefault();

                isDragging = true;

                startX = e.clientX;
                startY = e.clientY;

                sticker.setPointerCapture(
                    e.pointerId
                );

                sticker.classList.add(
                    "dragging"
                );


                if (
                    sticker.classList.contains(
                        "creative-cloud"
                    )
                ) {

                    sticker.style.animation =
                        "none";

                }

            }
        );


        sticker.addEventListener(
            "pointermove",
            (e) => {

                if (!isDragging) return;

                const moveX =
                    e.clientX - startX;

                const moveY =
                    e.clientY - startY;

                currentX += moveX;
                currentY += moveY;


                sticker.style.transform =
                    `
                    translate(
                        ${currentX}px,
                        ${currentY}px
                    )
                    rotate(
                        ${getStickerRotation(sticker)}deg
                    )
                    `;


                startX = e.clientX;
                startY = e.clientY;

            }
        );


        function resetCreativeCloud() {

            currentX = 0;
            currentY = 0;

            sticker.style.transition =
                "transform 0.7s cubic-bezier(.16,1,.3,1)";

            sticker.style.transform =
                "translate(0px,0px) rotate(0deg)";

            setTimeout(() => {

                sticker.style.transition = "";

                sticker.style.animation =
                    "creativeCloudFloat 4.5s ease-in-out infinite alternate";

            }, 750);

        }


        sticker.addEventListener(
            "pointerup",
            (e) => {

                if (!isDragging) return;

                isDragging = false;

                sticker.classList.remove(
                    "dragging"
                );

                try {

                    sticker.releasePointerCapture(
                        e.pointerId
                    );

                } catch (error) {}


                if (
                    sticker.classList.contains(
                        "creative-cloud"
                    )
                ) {

                    resetCreativeCloud();

                }

            }
        );


        sticker.addEventListener(
            "pointercancel",
            () => {

                isDragging = false;

                sticker.classList.remove(
                    "dragging"
                );

                if (
                    sticker.classList.contains(
                        "creative-cloud"
                    )
                ) {

                    resetCreativeCloud();

                }

            }
        );

    });


    function getStickerRotation(sticker) {

        if (
            sticker.classList.contains(
                "creative-paperclip"
            )
        ) {

            return -25;

        }

        if (
            sticker.classList.contains(
                "creative-star"
            )
        ) {

            return 8;

        }

        if (
            sticker.classList.contains(
                "creative-cloud"
            )
        ) {

            return 0;

        }

        return 0;

    }

});



/* =========================================================
   TV — SCALE / SCROLL
========================================================= */

const tvSectionGlobal =
    document.querySelector(".tv-section");

const tvWrapperGlobal =
    document.querySelector("#tvWrapper");

const tvVideoGlobal =
    document.querySelector("#tvVideo");

const tvSoundBtn =
    document.querySelector("#tvSoundBtn");


if (
    tvSectionGlobal &&
    tvWrapperGlobal &&
    tvVideoGlobal
) {

    function updateTVScale() {

        const rect =
            tvSectionGlobal.getBoundingClientRect();

        const sectionHeight =
            tvSectionGlobal.offsetHeight;

        const viewportHeight =
            window.innerHeight;


        let denominator =
            sectionHeight -
            viewportHeight;


        if (denominator <= 0) {
            denominator = 1;
        }


        let progress =
            -rect.top /
            denominator;


        progress =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );


        let startScale = 0.60;
        let maxScale = 1.20;
        let growAmount = 0.12;


        if (window.innerWidth <= 768) {

            startScale = 0.60;
            maxScale = 1.20;
            growAmount = 0.50;

        }


        const growProgress =
            Math.min(
                progress /
                growAmount,
                1
            );


        const scale =
            startScale +
            (
                maxScale -
                startScale
            ) *
            growProgress;


        tvWrapperGlobal.style.setProperty(
            "--tv-scale",
            scale
        );

    }


    let tvScaleTicking = false;
    window.addEventListener(
        "scroll",
        () => {
            if (tvScaleTicking) return;
            tvScaleTicking = true;
            requestAnimationFrame(() => {
                updateTVScale();
                tvScaleTicking = false;
            });
        },
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateTVScale
    );

    updateTVScale();

}


/* =========================================================
   TV SOUND AMBIENCE
========================================================= */

let tvAudioContext;
let tvHum;


function startTVSound() {

    if (!tvAudioContext) {

        tvAudioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

        tvHum =
            tvAudioContext.createOscillator();

        const gain =
            tvAudioContext.createGain();

        tvHum.type = "sine";

        tvHum.frequency.value = 90;

        gain.gain.value = 0.12;

        tvHum.connect(gain);

        gain.connect(
            tvAudioContext.destination
        );

        tvHum.start();

    }


    if (
        tvAudioContext.state ===
        "suspended"
    ) {

        tvAudioContext.resume();

    }

}


function stopTVSound() {

    if (tvAudioContext) {

        tvAudioContext.suspend();

    }

}


/* =========================================================
   TV VIDEO — 12 SECOND PREVIEW
========================================================= */

const tvContinueOverlay =
    document.getElementById(
        "tvContinueOverlay"
    );

const tvSoundWave =
    document.querySelector(
        ".tv-sound-wave"
    );


const youtubeTVLink =
    "https://youtu.be/AV6t_MtI3jM?si=KllAtjmA2eIe3lkt";


const TV_PREVIEW_TIME = 12;
// Start loading the TV video immediately
if (tvVideoGlobal) {
    tvVideoGlobal.load();
}


let tvPreviewFinished = false;

let tvPreviewTimer = null;


function updateTVSoundWave() {

    if (!tvSoundWave) return;

    if (
        tvVideoGlobal &&
        !tvVideoGlobal.paused &&
        !tvVideoGlobal.ended &&
        !tvPreviewFinished &&
        tvVideoGlobal.currentTime <
            TV_PREVIEW_TIME
    ) {

        tvSoundWave.style.display =
            "block";

    }

    else {

        tvSoundWave.style.display =
            "none";

    }

}


/* =========================================================
   START / RESUME TV PREVIEW
========================================================= */

function startTVPreview() {

    if (!tvVideoGlobal) return;


    if (
        tvPreviewFinished ||
        tvVideoGlobal.currentTime >=
            TV_PREVIEW_TIME
    ) {

        tvVideoGlobal.pause();

        tvPreviewFinished = true;

        updateTVSoundWave();

        tvVideoGlobal.classList.add(
            "blur-video"
        );


        if (tvContinueOverlay) {

            tvContinueOverlay.classList.add(
                "show"
            );

        }

        return;

    }


    if (
        tvVideoGlobal.readyState < 2
    ) {

        tvVideoGlobal.load();

        tvVideoGlobal.addEventListener(
            "loadeddata",
            () => {

                if (!tvPreviewFinished) {

                    playTVPreview();

                }

            },
            {
                once: true
            }
        );

        return;

    }


    playTVPreview();

}


/* =========================================================
   ACTUALLY PLAY TV
========================================================= */

function playTVPreview() {

    if (!tvVideoGlobal) return;

    if (tvPreviewFinished) return;


    const remainingTime =
        TV_PREVIEW_TIME -
        tvVideoGlobal.currentTime;


    clearTimeout(tvPreviewTimer);


    tvPreviewTimer =
        setTimeout(
            () => {

                tvVideoGlobal.currentTime =
                    TV_PREVIEW_TIME;

                tvVideoGlobal.pause();

                tvPreviewFinished = true;

                updateTVSoundWave();

                tvVideoGlobal.classList.add(
                    "blur-video"
                );


                if (tvContinueOverlay) {

                    tvContinueOverlay.classList.add(
                        "show"
                    );

                }

            },
            Math.max(
                remainingTime,
                0.1
            ) * 1000
        );


    tvVideoGlobal.muted = true;


    const playPromise =
        tvVideoGlobal.play();


    if (
        playPromise !== undefined
    ) {

        playPromise.catch(() => {});

    }

}


/* =========================================================
   TV PAGE ENTER / LEAVE
========================================================= */

if (tvSectionGlobal) {

    const tvPageObserver =
        new IntersectionObserver(
            (entries) => {

                const entry =
                    entries[0];


                if (entry.isIntersecting) {

                    if (
                        !tvPreviewFinished
                    ) {

                        startTVPreview();

                    }

                }

                else {

                    clearTimeout(
                        tvPreviewTimer
                    );

                    if (tvVideoGlobal) {
                        tvVideoGlobal.pause();
                    }

                    updateTVSoundWave();

                }

            },
            {
                threshold: 0.01
            }
        );


    tvPageObserver.observe(
        tvSectionGlobal
    );

}


/* =========================================================
   TV VIDEO PLAY
========================================================= */

if (tvVideoGlobal) {

    tvVideoGlobal.addEventListener(
        "play",
        () => {

            if (
                !tvPreviewFinished &&
                tvVideoGlobal.currentTime <
                    TV_PREVIEW_TIME
            ) {

                clearTimeout(
                    tvPreviewTimer
                );


                const remainingTime =
                    TV_PREVIEW_TIME -
                    tvVideoGlobal.currentTime;


                tvPreviewTimer =
                    setTimeout(
                        () => {

                            tvVideoGlobal.currentTime =
                                TV_PREVIEW_TIME;

                            tvVideoGlobal.pause();

                            tvPreviewFinished =
                                true;

                            updateTVSoundWave();

                            tvVideoGlobal.classList.add(
                                "blur-video"
                            );


                            if (
                                tvContinueOverlay
                            ) {

                                tvContinueOverlay.classList.add(
                                    "show"
                                );

                            }

                        },
                        remainingTime *
                        1000
                    );

            }

        }
    );


    tvVideoGlobal.addEventListener(
        "play",
        updateTVSoundWave
    );


    tvVideoGlobal.addEventListener(
        "pause",
        updateTVSoundWave
    );


    tvVideoGlobal.addEventListener(
        "ended",
        updateTVSoundWave
    );


    tvVideoGlobal.addEventListener(
        "ended",
        () => {

            clearTimeout(
                tvPreviewTimer
            );

            tvVideoGlobal.pause();

        }
    );

}


/* =========================================================
   CONTINUE TO WATCH → YOUTUBE
========================================================= */

if (tvContinueOverlay) {

    tvContinueOverlay.addEventListener(
        "click",
        () => {

            window.open(
                youtubeTVLink,
                "_blank"
            );

        }
    );

}


/* =========================================================
   WEBSITE / TAB HIDDEN
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            clearTimeout(
                tvPreviewTimer
            );

            if (tvVideoGlobal) {

                tvVideoGlobal.pause();

            }

        }

        else {

            if (
                tvSectionGlobal &&
                tvVideoGlobal
            ) {

                const rect =
                    tvSectionGlobal
                        .getBoundingClientRect();

                const tvVisible =
                    rect.top <
                        window.innerHeight &&
                    rect.bottom > 0;


                if (
                    tvVisible &&
                    !tvPreviewFinished
                ) {

                    startTVPreview();

                }

            }

        }

    }
);
/* =========================================================
   FINAL RESPONSIVE BEHAVIOUR
   PC / iPad / PHONE ONLY
   LAPTOP BEHAVIOUR UNCHANGED
========================================================= */

(() => {

    const applyResponsiveMotion = () => {

        /*
            Laptop range:
            1101px → 1366px

            Is range mein koi responsive
            change force nahi hoga.
        */

        const isLaptop =
            window.innerWidth >= 1101 &&
            window.innerWidth <= 1366;


        /*
            PC / iPad / Phone ke liye
            CSS ko identify karne ke liye class.
        */

        document.documentElement.classList.toggle(
            "responsive-non-laptop",
            !isLaptop
        );

    };


    /* Initial check */

    applyResponsiveMotion();


    /* Screen resize par dobara check */

    window.addEventListener(
        "resize",
        applyResponsiveMotion,
        {
            passive: true
        }
    );

})();