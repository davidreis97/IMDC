import { Directive,OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoHide]',
  host: {
    '(ionScroll)':'onContentScroll($event)'
  }
})
export class AutoHideDirective implements OnInit{

  fabToHide: Element;
  oldScrollTop: number = 0;

  constructor() {}

  ngOnInit(){
    this.fabToHide = document.querySelector('#mainFab');
    this.fabToHide.setAttribute("style","transition: opacity 100ms");
  }

  onContentScroll(e){
    if(e.detail.scrollTop - this.oldScrollTop > 10){
      this.fabToHide.setAttribute("style","opacity:0;transition: opacity 100ms");
    }else if (e.detail.scrollTop - this.oldScrollTop < 0){
      this.fabToHide.setAttribute("style","opacity:1;transition: opacity 100ms");
    }

    this.oldScrollTop = e.detail.scrollTop;
  }
}
