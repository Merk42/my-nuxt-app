<script setup lang="ts">
</script>
<template>
        <aside>
            <div>icon</div>
            <div>select</div>
            <div>
                <ul>
                    <li>
                        <a href="#">
                            <font-awesome icon="bookmark" />
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <font-awesome icon="circle-play" />
                            <span>Lessons</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <font-awesome icon="bookmark" />
                            <span>Video Exchanges</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <font-awesome icon="bookmark" />
                            <span>Study Materials</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <font-awesome icon="bookmark" />
                            <span>Bookmarks</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <font-awesome icon="bookmark" />
                            <span>History</span>
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="#">
                            <font-awesome icon="bookmark" />
                            <span>Metronome</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <font-awesome icon="bookmark" />
                            <span>Scale Browser</span>
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="#">
                            <font-awesome icon="bookmark" />
                            <span>Community</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <a href="#">
                            <font-awesome icon="bookmark" />
                            <span>My Account</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
</template>
<style scoped>

aside {
    background-color: var(--side-blue);
    color:#FFF;
    padding:20px;

    grid-template-columns: auto;
    grid-template-rows: auto auto 1fr auto;
}
aside ul {
    list-style-type:none;
    color:#FFF;
    margin:0;
    padding:0;
}
aside li {
    margin:.25rem 0;
}
aside a  {
    color:#FFF;
    width:100%;
    border-radius: .25rem;
    padding:.75rem;
    display: block
}
aside a:hover{
    background-color:rgba(255, 255, 255, .25)
}
</style>