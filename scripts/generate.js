document.getElementById('submission').addEventListener('click', function (event) {
    event.preventDefault();
    let activity;

    let participants = document.getElementById('participants').value;
    let apiUrl = 'https://www.boredapi.com/api/activity?';


    let type = document.getElementById('type').value;

    let accessibility = document.getElementById('accessibility').value;

    let price = document.getElementById('price').value;


    let count = 0;

    if (!(participants === '')) {
        apiUrl += 'participants=' + participants;
        count += 1;
    }

    if (!(type === 'any')) {
        if (count > 0) {
            apiUrl += '&';
        }
        apiUrl += 'type=' + type;
        count += 1;
    }

    if (!(parseInt(accessibility) === 0)) {
        if (count > 0) {
            apiUrl += '&';
        }
        apiUrl += 'accessibility=' + accessibility;

        count += 1;
    }

    if (!(parseInt(price) === 0)) {
        if (count > 0) {
            apiUrl += '&';
        }
        apiUrl += 'price=' + price;
        count += 1;
    }
    var modal = document.getElementById("myModal");

    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    var randomNumber = Math.floor(Math.random() * 10) + 1;

    if (randomNumber === 1) {
        document.getElementById("modal-text").textContent = 'Go gambling!';
        setTimeout(() => {
            window.location.href = "https://wanghci.github.io/project-milestone-2-gambler-s-paradise/";
        }, "2000");
        return;
    } else {

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {

                if (!data.activity || data.activity === '') {
                    document.getElementById("modal-text").textContent = 'No activity found with those parameters!';
                    return;
                }
                document.getElementById("modal-text").textContent = data.activity;
                activity = data.activity;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    document.getElementById("backBtn").onclick = function () {
        modal.style.display = "none";
    }

    document.getElementById("generateBtn").onclick = async function () {


        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            console.error("Spotify access token not found!");
            return;
        }

        const query = encodeURIComponent(activity);

        const apiUrl = `https://api.spotify.com/v1/search?q=${query}&type=playlist&market=US&limit=1`;

        console.log('made it this far');
        const payload = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
        console.log('and to here!');

        try {
            const response = await fetch(apiUrl, payload);
            console.log(response);
            console.log(await response.text());
            const responseData = await response.json();
            const playlist = responseData.playlists.items[0];
            localStorage.setItem("playlist", JSON.stringify(playlist));
            console.log("Playlist generated successfully:", playlist);
        } catch (error) {
            console.error('Error generating playlist:', error);
        }
        modal.style.display = "none";
    }
});

document.getElementById('accessibility').addEventListener('input', function () {
    document.getElementById('accessibilityValue').textContent = this.value;
});

document.getElementById('price').addEventListener('input', function () {
    document.getElementById('priceValue').textContent = this.value;
}); //test

document.getElementById('lucky').addEventListener('click', function (event) {
    event.preventDefault();
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    let apiUrl = 'https://www.boredapi.com/api/activity?';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("modal-text").textContent = data.activity;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    span.onclick = function () {
        modal.style.display = "none";
    }
}); //Make sure this is in the right spot; i did my best to put it where i think you meant to put it
document.getElementById("backBtn").onclick = function () {
    modal.style.display = "none";
}

document.getElementById("generateBtn").onclick = async function () {
    const payload = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer',
        },
        body: new URLSearchParams({
            q: data.activity, // for whatever reason, data.activity is not accessible;
            type: "playlist",
            market: "US",
            limit: 1
        })
    }

    let apiUrl = 'https://api.spotify.com/v1/search?'
    const response = await fetch(apiUrl, payload)
    const data = await response.json()
    let dataString = JSON.stringify(data)
    let playlistBlob = new Blob([dataString], { type: "applications/json" })
    localStorage.setItem("playlist", playlistBlob)

    modal.style.display = "none"; // hopefully this triggers the generate option to go away
}
//original }); was right here