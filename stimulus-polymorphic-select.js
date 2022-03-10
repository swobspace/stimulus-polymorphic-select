import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["primary", "secondary"]
  static values = {
    selected: String
  }

  connect() {
    this.updateSelectOptions()
  }

  change() {
    this.updateSelectOptions()
  }

  selectValue() {
    return this.primaryTarget.selectedOptions[0].value
  }

  selectUrl() {
    return this.primaryTarget.selectedOptions[0].getAttribute('data-url')
  }

  updateSelectOptions() {
    if (this.selectUrl() != undefined ) {
      this.secondaryTarget.parentElement.parentElement.hidden = false
      fetch(`${this.selectUrl()}?${this.params()}`, {
        headers: {
          Accept: "text/vnd.turbo-stream.html"
        }
      })
      .then(r => r.text())
      .then(html => Turbo.renderStreamMessage(html))
    } else {
    // hide select 
      this.secondaryTarget.parentElement.parentElement.hidden = true
    }
  }

  params() {
    let params = new URLSearchParams()
    params.append('select', this.secondaryTarget.id)
    params.append('selected', this.selectedValue)
    return params
  }

}
