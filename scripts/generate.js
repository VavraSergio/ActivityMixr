document.getElementById('activityForm').addEventListener('submit', function (event) {
    event.preventDefault();


    let participants = document.getElementById('participants').value;

    if (participants === '' || parseInt(participants) < 1) {
        participants = 1;
    }

    let type = document.getElementById('type').value;

    const apiUrl = 'https://www.boredapi.com/api/activity?' + 'participants=' + participants + '&' + 'type=' + type;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('activity').textContent = data.activity;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});