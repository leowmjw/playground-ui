<style scoped>

    .portfolio-item {
        margin-bottom: 25px;
    }

    footer {
        margin: 50px 0;
    }

</style>

<template>

    <!-- Page Content -->
    <div class="container">

        <!-- Page Header -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">{{ msg }}
                    <small>{{ gmsg }}</small>
                    <button @click.stop.prevent="updateGmsg">Press Me!!</button>
                </h1>
            </div>
        </div>
        <!-- /.row -->

        <!-- BabbageUI Row -->
        <div class="row">
            <babbageui></babbageui>
        </div>
        <!-- /.row -->

        <!-- Aduanku Row -->
        <!--
    <div class="row">
        <aduanku></aduanku>
        <div class="col-md-6 portfolio-item">
            <a href="#">
                <img class="img-responsive" src="http://placehold.it/700x400" alt="">
            </a>
            <h3>
                <a href="#">Project Four</a>
            </h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida
                pellentesque urna varius vitae.</p>
        </div>
    </div>
        -->
        <!-- /.row -->

        <!-- Projects Row -->
        <div class="row">
            <mpsearch :searcharea.sync="searcharea" :selectedarea.sync="selectedarea"></mpsearch>
        </div>
        <!-- /.row -->

        <div class="row">
            <div class="col-md-10 portfolio-item">
                <!-- SelectedArea: {{ selectedarea }} -->
                <gmaps :searcharea.sync="searcharea" :selectedarea="selectedarea" mapid="par"></gmaps>
            </div>
            <div class="col-md-5 portfolio-item">
                <gmaps mylat="3.07658" mylng="101.5240" mapid="michael"></gmaps>
            </div>
            <!--
            <div class="col-md-3 portfolio-item">
                <gmaps :searcharea="searcharea" mapid="dm"></gmaps>
            </div>
            -->
        </div>

        <!-- Projects Row -->
        <div class="row">
            <div class="col-md-6 portfolio-item">
                <a href="#">
                    <img class="img-responsive" src="http://placehold.it/700x400" alt="">
                </a>
                <h3>
                    <a href="#">Project Five</a>
                </h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida
                    pellentesque urna varius vitae.</p>
            </div>
            <div class="col-md-6 portfolio-item">
                <a href="#">
                    <img class="img-responsive" src="http://placehold.it/700x400" alt="">
                </a>
                <h3>
                    <a href="#">Project Six</a>
                </h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida
                    pellentesque urna varius vitae.</p>
            </div>
        </div>
        <!-- /.row -->

        <hr>

        <!-- Pagination -->
        <div class="row text-center">
            <div class="col-lg-12">
                <ul class="pagination">
                    <li>
                        <a href="#">&laquo;</a>
                    </li>
                    <li class="active">
                        <a href="#">1</a>
                    </li>
                    <li>
                        <a href="#">2</a>
                    </li>
                    <li>
                        <a href="#">3</a>
                    </li>
                    <li>
                        <a href="#">4</a>
                    </li>
                    <li>
                        <a href="#">5</a>
                    </li>
                    <li>
                        <a href="#">&raquo;</a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- /.row -->

        <hr>

        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>OpenSpending LOGO here ...</p>
                </div>
            </div>
            <!-- /.row -->
        </footer>

    </div>
    <!-- /.container -->

</template>

<script>

    import PopIt from './PopIt.vue'
    import MPSearch from './MPSearch.vue'
    import GMaps from './GMaps.vue'
    import Aduanku from './Aduanku.vue'
    import BabbageUI from './BabbageUI.vue'


    export default {
        props: ['gmsg'],
        components: {
            popit: PopIt,
            mpsearch: MPSearch,
            gmaps: GMaps,
            aduanku: Aduanku,
            babbageui: BabbageUI
        },
        data () {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                msg: 'OPenSpending Lite .. ole!',
                searcharea: null,
                selectedarea: null,
                dun: {
                    searcharea: null,
                    selectedarea: null
                },
                local_authorities: {
                    searcharea: null,
                    selectedarea: null
                },
                zon: {
                    searcharea: null,
                    selectedarea: null
                }
            }
        },
        ready () {
            this.gmsg = null
        },
        methods: {
            updateGmsg: function () {
                this.gmsg = "Press me!!"
            }
        }
    }

</script>