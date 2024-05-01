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

    if (!(type === 'any')) {
        if (count > 0) {
            apiURL += '&';
        }
        apiUrl += 'type=' + type;
    }
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('activity').textContent = data.activity;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

document.getElementById('accessibility').addEventListener('input', function () {
    document.getElementById('accessibilityValue').textContent = this.value;
});

document.getElementById('price').addEventListener('input', function () {
    document.getElementById('priceValue').textContent = this.value;
}); //test