export const initialCode = `
// app class.
class App extends QratchApp {
  frame() {
    const { renderer, drawer } = this

    // clear screen with black.
    renderer.fill('black')

    // draw red circle at cursor position.
    drawer.fillArc(this.cursor, 32, 0, Math.PI * 2, 'red')
  }
}

// start app.
const options = createCanvasAppOptions(playground.canvas)
const app = new App(options)
app.start()

`.trim()
