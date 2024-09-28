$(document).ready(function () {
     function getCardPaths() {
         const screenWidth = window.innerWidth;
      
         if (screenWidth = 1920) {
           return [
             [{ x: '300', y: '0' }, { x: '0', y: '-200' }, { x: '2', y: '-30' }],    
             [{ x: '0', y: '0' }, { x: '50', y: '-200' }, { x: '4', y: '-80' }],
             [{ x: '0', y: '0' }, { x: '400', y: '-400' }, { x: '30', y: '-82' }],
             [{ x: '0', y: '0' }, { x: '150', y: '-200' }, { x: '45', y: '-30' }]
           ];
         } else if (screenWidth <= 1400 && screenWidth < 1600) {
           return [
             [{ x: '300', y: '0' }, { x: '0', y: '-200' }, { x: '2', y: '-30' }], 
             [{ x: '0', y: '0' }, { x: '50', y: '-200' }, { x: '4', y: '-90' }], 
             [{ x: '0', y: '0' }, { x: '50', y: '-200' }, { x: '10', y: '-90' }], 
             [{ x: '300', y: '0' }, { x: '0', y: '-200' }, { x: '10', y: '-30' }] 
           ];
         } else if (screenWidth <= 1200 && screenWidth < 1400) {
           return [
             [{ x: '300', y: '0' }, { x: '0', y: '-200' }, { x: '2', y: '-30' }], 
             [{ x: '0', y: '0' }, { x: '50', y: '-200' }, { x: '4', y: '-30' }], 
             [{ x: '0', y: '0' }, { x: '50', y: '-200' }, { x: '10', y: '-30' }], 
             [{ x: '300', y: '0' }, { x: '0', y: '-200' }, { x: '10', y: '-30' }] 
           ];
         } else {
           return [
             [{ x: '300', y: '0' }, { x: '0', y: '-200' }, { x: '2', y: '-30' }],
             [{ x: '0', y: '0' }, { x: '50', y: '-200' }, { x: '4', y: '-30' }], 
             [{ x: '0', y: '0' }, { x: '50', y: '-200' }, { x: '10', y: '-30' }], 
             [{ x: '300', y: '0' }, { x: '0', y: '-200' }, { x: '0', y: '-30' }]
           ];
         }
       }
      
       const staggerDelay = 0.3; 
       gsap.fromTo(".cards", 
           {
               x: '100vw',
               y: '10vh',
               opacity: 0 
           }, 
           {
               motionPath: {
                path: (i) => getCardPaths()[i], 
                autoRotate: false,
               },
               opacity: 1,  
               duration: 2, 
               stagger: staggerDelay, 
               scrollTrigger: {
                   trigger: ".banner-cards", 
                  start: "top 80%",       
                   toggleActions: "play none none none",
                  scrub: false,
               }
           }
       );
   

const ctx = $('#Chart')[0].getContext('2d');
let barChart;

const data = {
    users: {
            weekly: [44, 62, 57, 32, 62, 46, 31],
            monthly: [50, 43, 56, 19, 34, 75, 80]
        },
        orders: {
            weekly: [20, 30, 40, 50, 60, 70, 80],
            monthly: [11, 22, 33, 44, 55, 66, 77]
        },
        payments: {
            weekly: [3, 5, 16, 36, 76, 84, 35],
            monthly: [56, 32, 75]
        }
};

const options = {
    
    animation: { 
        duration: 2000, 
        easing: 'linear' 
    },
    legend: {
        display: false,
        position: 'top',
        labels: {
          fontColor: "#000080",
        }
      },
    scales: {
        x: {
            grid: { 
                display: false, 
                color: "#ababb7",
                borderColor: "#000",
                borderWidth: 2  
            },
            ticks: {
                color: "#000", 
                font: { 
                    size: 14, 
                    weight: 'bold' 
                } 
            },
            title: { 
                display: true, 
                text: 'Weekly Data', 
                color: "#000", 
                font: { 
                    size: 16, 
                    weight: 'bold'
                 } 
            }
        },
        y: {
            beginAtZero: true,
            max: 100,
            ticks: { 
                color: "#000", 
                font: { 
                    size: 14, 
                    weight: 'bold' 
                }
             },
            grid: { 
                display: true,
                color: "#ababb7",
                drawBorder: true, 
                borderDash: [5, 5], 
                borderDashOffset: 0, 
            },
            title: { 
                display: true, 
                text: 'Number of Users', 
                color: "#000", 
                font: { 
                    size: 16, 
                    weight: 'bold' 
                } 
            }
        }
    },
    plugins: {
        tooltip: {
            enabled: false 
        },
        legend: {
            display: false,
        }
    }
};
function createChart(dataValues, labels) {
    if (barChart) barChart.destroy();
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{ 
                backgroundColor: "#ffbd59", 
                data: dataValues,
                label: '', 
                maxBarThickness: 20 
            }]
        },
        options: options
    });
}

function updateChart() {
    const dataOption = $('#userSelector').val();
    const timeOption = $('#dateSelector').val();
    const timeLabels = {
        weekly: ['Mon', 'Tues', 'Weds', 'Thur', 'Fri', 'Sat', 'Sun'],
        monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    };
    const dataValues = data[dataOption][timeOption];
    options.scales.x.title.text = timeOption === 'weekly' ? 'Weekly Data' : 'Monthly Data';
    if (dataOption === 'users') {
        options.scales.y.title.text = 'Number of Users';
    } else if (dataOption === 'orders') {
        options.scales.y.title.text = 'Number of Orders';
    } else if (dataOption === 'payments') {
        options.scales.y.title.text = 'Number of Payments';
    }

    createChart(dataValues, timeLabels[timeOption]);
}
$(document).ready(updateChart);
$('#userSelector, #dateSelector').change(updateChart);

});
