         // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards for animation
        document.querySelectorAll('.market-card, .feature-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Simulate real-time price updates
        function updatePrices() {
            const priceElements = document.querySelectorAll('.crypto-price');
            const changeElements = document.querySelectorAll('.crypto-change');
            const tickerItems = document.querySelectorAll('.ticker-item');

            priceElements.forEach((element, index) => {
                // Generate random price change (small fluctuation)
                const currentPrice = parseFloat(element.textContent.replace('$', '').replace(',', ''));
                const change = (Math.random() - 0.5) * 0.02; // 2% max change
                const newPrice = currentPrice * (1 + change);
                
                // Format price based on value
                let formattedPrice;
                if (newPrice >= 1000) {
                    formattedPrice = '$' + newPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                } else {
                    formattedPrice = '$' + newPrice.toFixed(4);
                }
                
                element.textContent = formattedPrice;
                
                // Update change percentage
                if (changeElements[index]) {
                    const changePercent = ((Math.random() - 0.5) * 10).toFixed(2); // Random change %
                    const isPositive = changePercent > 0;
                    changeElements[index].textContent = `${isPositive ? '+' : ''}${changePercent}% (24h)`;
                    changeElements[index].className = `crypto-change ${isPositive ? 'positive' : 'negative'}`;
                }
            });

            // Update ticker prices
            tickerItems.forEach(item => {
                const priceSpan = item.querySelector('span:last-child');
                if (priceSpan) {
                    const changePercent = ((Math.random() - 0.5) * 6).toFixed(2); // Random change %
                    const isPositive = changePercent > 0;
                    const currentText = priceSpan.textContent.split(' ')[0];
                    priceSpan.textContent = `${currentText} ${isPositive ? '+' : ''}${changePercent}%`;
                    priceSpan.className = isPositive ? 'positive' : 'negative';
                }
            });
        }

        // Update prices every 3 seconds
        setInterval(updatePrices, 3000);

        // Mobile menu toggle (basic implementation)
        const navMenu = document.querySelector('.nav-menu');
        const navContainer = document.querySelector('.nav-container');
        
        // Add mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: #eaecef;
            font-size: 24px;
            cursor: pointer;
            @media (max-width: 768px) {
                display: block;
            }
        `;
        
        navContainer.insertBefore(mobileMenuBtn, navContainer.lastElementChild);
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        // Update stats with animation
        function animateStats() {
            const stats = [
                { element: document.querySelectorAll('.stat-number')[0], target: 120, suffix: 'M+' },
                { element: document.querySelectorAll('.stat-number')[1], target: 76, suffix: 'B' },
                { element: document.querySelectorAll('.stat-number')[2], target: 350, suffix: '+' },
                { element: document.querySelectorAll('.stat-number')[3], target: 180, suffix: '+' }
            ];

            stats.forEach((stat, index) => {
                if (stat.element) {
                    let current = 0;
                    const increment = stat.target / 100;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= stat.target) {
                            current = stat.target;
                            clearInterval(timer);
                        }
                        stat.element.textContent = Math.floor(current) + stat.suffix;
                    }, 20);
                }
            });
        }

        // Trigger stats animation when hero section is visible
        const heroSection = document.querySelector('.hero');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateStats, 500);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(heroSection);
 