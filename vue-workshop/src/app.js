var app = new Vue({
    // mounted to <div id="app">
    el: '#app',
    // all data we need in UI
    data: {
        topMessage: "Click to start!! BOOB!!!",
        cards: [],
    },
    // lifecycle, when component created
    created: function () {
        this.cards = this.shuffleCards()
    },
    // all data for compute purpose only, no logic
    computed: {},
    // function to format display data in ui, same as angularjs filter
    filters: {},
    // all the functions
    methods: {
        shuffleCards: () => {
            const ids = ['a', 'b', 'c', 'd', 'e', 'f']
            const cards = _.concat([], ids, ids)
            const imgBaseUrl = "assets/images/avengers/%img.jpg"
            let list = _.map(cards, (card, key) => {
                return {
                    id: key,
                    coverImg: imgBaseUrl.replace("%img", `cover-1`),
                    img: imgBaseUrl.replace("%img", `card-${card}`),
                    isCompleted: false,
                    isFlipped: false,
                }
            })
            console.error(list)
            return _.shuffle(list)
        },
        flipCard: (card) => {
            if (card.isFlipped) {
                card.isFlipped = false
            } else {
                card.isFlipped = true
            }
        }
    }
});