document.getElementById('activityForm').addEventListener('submit', function (event) {
    event.preventDefault();


    let participants = document.getElementById('participants').value;

    if (participants === '' || parseInt(participants) < 1) {
        participants = 1;
    }

    let type = document.getElementById('type').value;

    let accessibility = document.getElementById('accessibility').value;

    let price = document.getElementById('price').value;

    let apiURL;
    if (type === 'Any') {
        apiUrl = 'https://www.boredapi.com/api/activity' + 'participants=' + participants + '&price=' + price + '&accessibility=' + accessibility;
    } else {
        apiUrl = 'https://www.boredapi.com/api/activity' + 'participants=' + participants + '&type=' + type + '&price=' + price + '&accessibility=' + accessibility;
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
});

document.getElementById('activityForm').addEventListener('button', function (event) {
    event.preventDefault();

    apiUrl = 'https://www.boredapi.com/api/activity';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('activity').textContent = data.activity;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});