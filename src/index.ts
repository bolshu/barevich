type BarData = {
  key: string
  value: number
  color: string
}

type BarGroupData = {
  items: BarData[]
}

type Size = number

type Params = {
  node: HTMLElement
  data: BarGroupData[]
  width: Size
  height: Size
}

export default class Barevich {
  private readonly params: Params

  private readonly id: string

  constructor (params: Params) {
    this.params = params
    this.id = Date.now().toString()
  }

  private renderRect (node: SVGElement, x: Size, y: Size, width: Size, height: Size, fill: string) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')

    rect.setAttributeNS(null, 'x', x.toString())
    rect.setAttributeNS(null, 'y', y.toString())
    rect.setAttributeNS(null, 'width', width.toString())
    rect.setAttributeNS(null, 'height', height.toString())
    rect.setAttributeNS(null, 'fill', fill)

    node.appendChild(rect)
  }

  private renderBars (node: SVGElement, width: Size, height: Size, data: BarGroupData[]) {
    const maxGroupLen = Math.max(...data.map(it => (it.items.length)))

    const groupWidth = width / data.length
    const barWidth = groupWidth / maxGroupLen

    const maxBarValue = Math.max(...data.map(it => (it.items)).flat().map(it => (it.value)))
    const heightFactor = height / maxBarValue

    data.forEach((group: BarGroupData, groupIdx) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')

      group.items.forEach((bar, barIdx) => {
        const barHeight = bar.value * heightFactor
        const x = groupIdx * groupWidth + barIdx * barWidth
        const y = height - barHeight

        this.renderRect(g, x, y, barWidth, barHeight, bar.color)
      })

      node.appendChild(g)
    })
  }

  private renderSVG (node: HTMLElement, width: Size, height: Size, data: BarGroupData[]) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

    svg.setAttributeNS(null, 'id', this.id)
    svg.setAttributeNS(null, 'version', '1.1')
    svg.setAttributeNS(null, 'viewBox', `0 0 ${width} ${height}`)
    svg.setAttributeNS(null, 'width', width.toString())
    svg.setAttributeNS(null, 'height', height.toString())

    this.renderBars(svg, width, height, data)

    node.appendChild(svg)
  }

  init () {
    this.renderSVG(this.params.node, this.params.width, this.params.height, this.params.data)
  }
}

// init

// const ELEM_ID = 'id'
// const addElemToBody = () => {
//   const elem = document.createElement('DIV')

//   elem.setAttribute(ELEM_ID, ELEM_ID)
//   elem.style.width = '700px'
//   elem.style.height = '400px'

//   document.body.appendChild(elem)

//   document.body.style.width = '100vw'
//   document.body.style.height = '100vh'
// }

// addElemToBody()

// const elem = document.getElementById(ELEM_ID)!

// const data = [{
//   items: [
//     {
//       key: 'lol',
//       value: 41,
//       color: 'aqua'
//     },
//     {
//       key: 'kek',
//       value: 63,
//       color: 'tomato'
//     }
//   ]
// }, {
//   items: [
//     {
//       key: 'lol',
//       value: 13,
//       color: 'aqua'
//     },
//     {
//       key: 'kek',
//       value: 51,
//       color: 'tomato'
//     }
//   ]
// }, {
//   items: [
//     {
//       key: 'lol',
//       value: 78,
//       color: 'aqua'
//     },
//     {
//       key: 'kek',
//       value: 16,
//       color: 'tomato'
//     }
//   ]
// }]

// const barevichConfig = {
//   node: elem,
//   data,
//   width: 600,
//   height: 300
// }

// const barevich = new Barevich(barevichConfig)
// barevich.init()
