<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export class EventBus extends Vue {}
const eventBus = new EventBus()

export default eventBus
</script>
