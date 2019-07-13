import React from 'react'
import { 
  FlatList,
} from 'react-native'
import FlatListItem from './FlatListItem'

export default class OptimizedFlatList extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {}
    this.rowRefs =[]
    this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this)
  }

  _addRowRefs(ref, data){
    this.rowRefs[data.index] = {
      ref: ref,
      item: data.item,
      index: data.index,
    }
  }
  
  _updateItem(index, visibility){
    if (!this.rowRefs[index].ref) {
      return false;
    }
    // if (this.rowRefs[index - 1]) {
    //   this.rowRefs[index - 1].ref && this.rowRefs[index - 1].ref.setVisibility(true)
    // }
    // // if (this.rowRefs[index - 2]) {
    // //   this.rowRefs[index - 2].ref.setVisibility(true)
    // // }
    // if (this.rowRefs[index + 1]) {
    //   this.rowRefs[index + 1].ref && this.rowRefs[index + 1].ref.setVisibility(true)
    // }
    // if (this.rowRefs[index + 2]) {
    //   this.rowRefs[index + 2].ref.setVisibility(true)
    // }
    if (this.rowRefs[index]) {
      this.rowRefs[index].ref && this.rowRefs[index].ref.setVisibility(visibility)
    }
    return visibility
  }

  _renderItem(data){
    const view = this.props.renderItem(data)
    return (
      <FlatListItem
        ref={ myItem => this._addRowRefs(myItem, data)}
        viewComponent={view}
        data={data}
      />
    )
  }

  _onViewableItemsChanged (info: {
      changed: Array<{
        key: string,
        isViewable: boolean,
        item: any,
        index: ?number,
        section?: any,
      }>
    }
  ) {
    info.changed.map(item => 
      this._updateItem(item.index, item.isViewable)
    )
    this.props.onViewableItemsChanged && this.props.onViewableItemsChanged(info);
  }

  scrollToOffset(params: {animated?: ?boolean, offset: number}) {
    if (this._listRef) {
      this._listRef.scrollToOffset(params);
    }
  }

  scrollToIndex = ({index}) => {
    this._listRef.scrollToIndex({index});
  }

  render() {
    return (
      <FlatList
        {...this.props}
        ref={ref => this._listRef = ref}
        renderItem={ data => this._renderItem(data) }
        onViewableItemsChanged={this._onViewableItemsChanged}
      />
    )
  }
}
