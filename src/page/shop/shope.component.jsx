import React from 'react';

import SHOPE_DATA from './shop.data'

import CollectionPreview from '../../components/collection-preview/collection-preview.component'
class ShopPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            collections: SHOPE_DATA
        }
    }

    render() {
        const { collections } = this.state
        return (
            <div className='shop-page'>
                {
                    collections.map(({id, ...otherCollectionProps }) => (
                        <CollectionPreview key={id} {...otherCollectionProps} />
                    ))
                }
            </div>
        )

    }
}

export default ShopPage;