new Vue({
	el: '#app',
	data () {
		return {
			info: "",
			lives: 5,
			result: ""
		}
	},
	methods: {
		process: function(event) {
			var arrival = new Date(this.info.arrT.replace("T", " "));
			var lastseen = new Date(this.info.prdt.replace("T", " "));
			var time = arrival - lastseen;
			time = Math.round((time / 1000) / 60);
			if (document.getElementById("abox").value == time) {
				window.alert("You Win!");
				location.reload();
			} else {
				if (this.lives == 1) {
					window.alert("You lose. It actually came in " + time + " minutes!");
					location.reload();
				} else {
					this.lives = this.lives - 1;
					this.result = "Try again. You still have " + this.lives + " lives left!";
				}
			}
		}
	},
	mounted () {
		const stops = ['40380', '41700', '41680', '40900', '40690', '41120', '40680', '40660', '41410', '40210', '40140', '40850', '40070', '40250', '41140', '40930', '40650', '40890', '40960', '41310', '40040'];
		const stname = Math.round(Math.random() * 20);
		fetch("https://cors-anywhere.herokuapp.com/http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=e325bc1ce4ad4ce0a3ad0830739c4993&mapid=" + stops[stname] + "&max=1&outputType=JSON")
		.then(response => response.json())
		.then(data => {
			this.info = data.ctatt.eta[0];
		});
	}
})