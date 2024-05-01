document.getElementById('activityForm').addEventListener('submit', function (event) {
    event.preventDefault();


    let participants = document.getElementById('participants').value;
    let apiUrl = 'https://www.boredapi.com/api/activity?';


    let type = document.getElementById('type').value;

    let count = 0;

    if (!(participants === '')) {
        apiUrl += 'participants=' + participants;
        count += 1;
    }

    if (!(type === 'Any')) {

    }

    apiUrl = 'https://www.boredapi.com/api/activity?' + 'participants=' + participants + '&' + 'type=' + type;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('activity').textContent = data.activity;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});