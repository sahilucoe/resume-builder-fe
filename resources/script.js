 angular.module('resumeApp', [])
    .controller('ResumeController', function($scope, $timeout) {
        var { jsPDF } = window.jspdf;
        $scope.data = {
            name: 'Sahil Kumar',
            title: 'Senior Software Engineer',
            email: 'kansal.sahil@hotmail.com',
            phone: '+91-9876543210',
            location: 'Hyderabad, India',
            linkedin: 'https://linkedin.com/in/sahilucoe',
            skills: ['Java', 'C#, .NET MVC', 'SQL', 'AWS Services', 'Redis', 'Messaging Queues', 'RESTful services',
                    'Git, Subversion', 'Web APIs', 'TDD', 'BDD', 'Grafana', 'Unit / Integration Testing',
                    'SOLID principles', 'Lead testing', 'Multithreading', 'Code Review'],
            jobs: [
                {
                    title: 'Software Engineer 2',
                    company: 'Amazon Web Services',
                    date: '09/2022 - Present',
                    responsibilities: [
                        'Worked as a part of AWS RDS SQL Server Team.',
                        'Led key projects for the team (e.g High Customer Lead Detection) right from project conceptualization to delivery. Hands on involvement in writing design documents, driving design discussions, proof of concepts, coding, code reviews, unit & integration testing.',
                        'Skilled in best practices, championing the application of SOLID principles for clean, testable, and optimized code aligned with efficient data structures and algorithms. Proficient in integrating thorough unit and integration testing within the test software practices to ensure comprehensive coverage and heightened software reliability.',
                        'Led the operational excellence initiatives for the team to reduce the operational burden for the team from 18 tickets per week to 10 tickets per week.',
                        'Helped team hire, develop junior engineers.'
                    ],
                    responsibilitiesText: `Worked as a part of AWS RDS SQL Server Team.
Led key projects for the team (e.g High Customer Lead Detection) right from project conceptualization to delivery. Hands on involvement in writing design documents, driving design discussions, proof of concepts, coding, code reviews, unit & integration testing.
Skilled in best practices, championing the application of SOLID principles for clean, testable, and optimized code aligned with efficient data structures and algorithms. Proficient in integrating thorough unit and integration testing within the test software practices to ensure comprehensive coverage and heightened software reliability.
Led the operational excellence initiatives for the team to reduce the operational burden for the team from 18 tickets per week to 10 tickets per week.
Helped team hire, develop junior engineers.`
                },
                {
                    title: 'Senior Software Engineer',
                    company: 'LeadSquared (MarketXpander)',
                    date: '07/2020 - 08/2022',
                    responsibilities: [
                        'Responsibilities- Backend development strictly following the SOLID principles to produce software designs more flexible, maintainable and understandable. Involved in writing autosuited tests (Unit, Integration & Acceptance Tests) using TDD / BDD. Structured high code quality and on time functional/non-functional deliverables, peer code reviews. Mentored team members on development best practices and use of new technologies to improve the overall code quality. End to end ownership of the feature development from requirement analysis to the release. Quick root cause analysis and resolution of any defects reported by the customer. Quick and active participation in Production issues.'
                    ],
                    responsibilitiesText: `Responsibilities- Backend development strictly following the SOLID principles to produce software designs more flexible, maintainable and understandable. Involved in writing autosuited tests (Unit, Integration & Acceptance Tests) using TDD / BDD. Structured high code quality and on time functional/non-functional deliverables, peer code reviews. Mentored team members on development best practices and use of new technologies to improve the overall code quality. End to end ownership of the feature development from requirement analysis to the release. Quick root cause analysis and resolution of any defects reported by the customer. Quick and active participation in Production issues.`
                },
                {
                    title: 'Software Developer',
                    company: 'Sage',
                    date: '04/2020 - 12/2021',
                    responsibilities: [
                        'Responsibilities- Backend Design, Backend Development, Code Reviews, Unit Testing, Performance Tuning.'
                    ],
                    responsibilitiesText: 'Responsibilities- Backend Design, Backend Development, Code Reviews, Unit Testing, Performance Tuning.'
                },
                {
                    title: 'Software Engineer',
                    company: 'ZS Associates',
                    date: '07/2017 - 04/2020',
                    responsibilities: [
                        'Responsibilities- Full stack development.'
                    ],
                    responsibilitiesText: 'Responsibilities- Full stack development.'
                }
            ],
            education: [
                {
                    degree: 'Bachelor of Technology in',
                    field: 'Computer Engineering',
                    university: 'Punjabi University',
                    date: '06/2013 - 06/2017'
                }
            ]
        };

        $scope.resume = angular.copy($scope.data);

        // Initialize the text areas
        $scope.skillsText = $scope.resume.skills.join('\n');

        // Update skills when text changes
        $scope.updateSkills = function() {
            $scope.resume.skills = $scope.skillsText.split('\n').map(skill => skill.trim());
        };

        // Update responsibilities when text changes
        $scope.updateResponsibilities = function(job) {
            job.responsibilities = job.responsibilitiesText.split('\n').map(responsibility => responsibility.trim());
        };

        // Add and remove job entries
        $scope.addJob = function() {
            $scope.resume.jobs.push({
                title: '',
                company: '',
                date: '',
                responsibilities: [],
                responsibilitiesText: ''
            });
        };

        $scope.removeJob = function(index) {
            $scope.resume.jobs.splice(index, 1);
        };

        // Add and remove education entries
        $scope.addEducation = function() {
            $scope.resume.education.push({
                degree: '',
                field: '',
                university: '',
                date: ''
            });
        };

        $scope.removeEducation = function(index) {
            $scope.resume.education.splice(index, 1);
        };

        // Reset form function
        $scope.resetForm = function() {
            if (confirm('Are you sure you want to reset the form? This will clear all your changes.')) {
                $scope.resume = angular.copy($scope.data);
                $scope.skillsText = $scope.resume.skills.join('\n');
            }
        };

        $scope.generatePDF = function() {
            NProgress.start();
            var element = document.getElementById('resume-preview');
            html2canvas(element,{
                    scale: 2,  // Increase scale for better quality
                    useCORS: true,  // Enable CORS if external resources are used
                    scrollX: 0,
                    scrollY: -window.scrollY,
                    windowWidth: document.body.scrollWidth,
                    windowHeight: element.scrollHeight
                }).then(function(canvas) {
                var imgData = canvas.toDataURL('image/png');
                var pdf = new jsPDF('p', 'mm', 'a4');
                var pageWidth = pdf.internal.pageSize.getWidth();
                var pageHeight = pdf.internal.pageSize.getHeight();
                var imgWidth = pageWidth;
                var imgHeight = canvas.height * (pageWidth / canvas.width);
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save('download.pdf');
                NProgress.done();
            });
        };

        // PDF generation function
//        $scope.generatePDF2 = function() {
//            NProgress.start();
//            const element = document.getElementById('resume-preview');
//            const opt = {
//                margin: 2,
//                filename: 'resume.pdf',
//                image: { type: 'jpeg', quality: 1 },
//                html2canvas: {
//                    scale: 2
//                },
//                jsPDF: {
//                    unit: 'mm',
//                    format: 'a4',
//                    orientation: 'portrait'
//                }
//            };
//
//            try {
//                // Generate PDF
//                html2pdf().set(opt).from(element).save();
//            } finally {
//                NProgress.done();
//            }
//        };
    });