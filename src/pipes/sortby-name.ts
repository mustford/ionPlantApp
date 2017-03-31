import { Pipe } from '@angular/core';

@Pipe({
  name: 'sortbyName'
})

export class SortbyNamePipe {
  transform(array: Array<string>, args: string): Array<string> {
    if (array) {
      array.sort((a: any, b: any) => {
  	    if ( a['name'][args] < b['name'][args] ){
  	    	return -1;
  	    }else if( a['name'][args] > b['name'][args] ){
  	        return 1;
  	    }else{
  	    	return 0;
  	    }
      });
      return array;  
    }

  }
}
