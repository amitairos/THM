import { Component, Input, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'expandable-header',
  templateUrl: 'expandable-header.html'
})
export class ExpandableHeader {

  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;

  newHeaderHeight: any;

  constructor(public element: ElementRef, public renderer: Renderer) {

  }

  ngOnInit() {

    this.renderer.setElementStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');

    this.scrollArea.ionScroll.subscribe((ev) => {
      this.resizeHeader(ev);
    });

  }

  resizeHeader(ev) {

    ev.domWrite(() => {

      this.newHeaderHeight = this.headerHeight - ev.scrollTop;

      if (this.newHeaderHeight < 48) {
        this.renderer.setElementStyle(this.element.nativeElement.children[0], 'background-color', '#4f6328');
        this.renderer.setElementStyle(this.element.nativeElement, 'background-color', '#4f6328');
        this.renderer.setElementStyle(this.element.nativeElement, 'background-image', 'none');
        this.renderer.setElementStyle(this.element.nativeElement.children[0].children[0].children[0], 'font-size', '18px');
        this.newHeaderHeight = 48;
      }
      else {
        this.renderer.setElementStyle(this.element.nativeElement.children[0], 'background-color', 'transparent');
        this.renderer.setElementStyle(this.element.nativeElement.children[0].children[0].children[0], 'font-size', '25px');
        this.renderer.setElementStyle(this.element.nativeElement, 'background-image', 'url(".././assets/imgs/header34.jpg")');
        //this.renderer.setElementAttribute(this.scrollArea, 'scroll', 'false');
      }

      this.renderer.setElementStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');

      for (let headerElement of this.element.nativeElement.children) {

        let totalHeight = headerElement.offsetTop + headerElement.clientHeight;

        if (totalHeight > this.newHeaderHeight && !headerElement.isHidden) {
          headerElement.isHidden = true;
          //this.renderer.setElementStyle(headerElement, 'background-color', '#4f6328');
        } else if (totalHeight <= this.newHeaderHeight && headerElement.isHidden) {
          headerElement.isHidden = false;
          //this.renderer.setElementStyle(headerElement, 'background-color', 'transparent');
        }

      }

    });

  }

}