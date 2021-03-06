<script>
import WdBadge from 'wot-design/packages/badge'

export default {
  name: 'WdTabbarItem',
  inject: ['tabbar'],
  props: {
    name: String,
    icon: String,
    activeIcon: String,
    dot: Boolean,
    value: [Number, String],
    max: Number,
    to: [String, Object],
    replace: Boolean,
    top: Number,
    right: Number
  },
  components: {
    WdBadge
  },
  computed: {
    index () {
      return this.tabbar.items.indexOf(this)
    },
    isActive () {
      return this.index === this.tabbar.activeIndex
    },
    renderBadge () {
      return this.dot || this.value || this.value === 0
    },
    color () {
      return this.isActive
        ? this.tabbar.activeColor
        : this.tabbar.inactiveColor
    }
  },
  created () {
    if (this.tabbar) {
      this.tabbar.items.push(this)
    }
  },
  render (h) {
    let Icon = this.$slots.icon
      ? this.$slots.icon
      : (<i class={` wd-tabbar-item__icon ${this.icon}` }></i>)

    let ActiveIcon = this.isActive && this.activeIcon && !this.$slots.icon ? (<i class={` wd-tabbar-item__icon ${this.activeIcon}` }></i>) : ''
    let Content = (
      <div>
        <div class="wd-tabbar-item__icon-container">
          {
            this.renderBadge
              ? <WdBadge value={this.value} is-dot={this.dot} top={this.top} right={this.right} max={this.max} bg-color={this.tabbar.badgeColor}>{ActiveIcon || Icon}</WdBadge>
              : (ActiveIcon || Icon)
          }
        </div>
        <div class="wd-tabbar-item__label">
          { this.$slots.default }
        </div>
      </div>
    )

    if (this.to) {
      let isRouterLink = true
      let color
      if (this.to && this.$router) {
        const resolved = this.$router.match(this.to)
        if (!resolved.matched.length) {
          isRouterLink = false
        } else {
          color = resolved.matched.some(route => {
            return route.path === this.$router.currentRoute.path
          }) ? this.tabbar.activeColor : this.tabbar.inactiveColor
        }
      }

      return isRouterLink
        ? <router-link class={{
          'wd-tabbar-item': true,
          'is-active': this.isActive
        }} style={{ 'color': color }} to={this.to} replace={this.replace} tag="div">
          {Content}
        </router-link>
        : <a class={{
          'wd-tabbar-item': true,
          'is-active': this.isActive
        }} style={{ 'color': this.color }} href={this.to}>
          {Content}
        </a>
    } else {
      return (
        <div class={{
          'wd-tabbar-item': true,
          'is-active': this.isActive
        }} style={{ 'color': this.color }} onClick={() => { this.tabbar.changeTabbar(this.index) }}>
          {Content}
        </div>
      )
    }
  },
  destroyed () {
    this.tabbar.items.splice(this.tabbar.items.indexOf(this), 1)
  }
}
</script>
