<template>
    <div id="main">
        <div>
            <div class="topNav">
                <div>
                    <div class="search">
                        <div>
                            <input type="text" name="" id="search" placeholder="ブース/企画/ステージ情報を検索" v-model="query">
                        </div>
                    </div>
                </div>
            </div>
            <div class="content booth">
                <div>
                    <h1>ブース一覧</h1>
                    <div class="colorButtons">
                        <div class="colorButton" v-for="booth in boothsResult" v-bind:key="booth.title">
                            <div>
                                <h4>{{ booth.title }}</h4>
                            </div>
                            <p>{{ booth.group }}</p>
                            <p>{{ booth.product }}</p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">

</style>


