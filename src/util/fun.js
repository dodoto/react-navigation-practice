export function keyExtractor(item,index) {
  return item.id+''+index
}

export function getItemLayout(data,index,height,separatorHeight = 0) {
  let length = height + separatorHeight;
  return { length , offset: length * index, index }
}