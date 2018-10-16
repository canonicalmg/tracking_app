/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Item" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or an "Animal," or something like that.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
export class Subjective {

  constructor(fields: any) {
    this.items = [
      {
        name: "Mood",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
        active: true
      }
    ];
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }

  activeItems() {
    let activeItems = [];
    for(let item in this.items){
      if(item['active']){
        activeItems.push(item);
      }
    }
    return activeItems;
  }

}

export interface Subjective {
  [prop: string]: any;
}
