---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Granular (identity) caching
description: How to implement cache identities, for granular data caching!

# Micro navigation
micro_nav:
  enabled: true
  url: '/docs/cookbook'
  title: Cookbook

# Page navigation
page_nav:
    prev:
        content: Connecting resolvers
        url: '/docs/cookbook/connecting-resolver'

---

ScandiPWA controls cache in a different way than [default Magento 2](https://devdocs.magento.com/guides/v2.3/graphql/develop/create-graphqls-file.html#query-caching) does. We are still using the caching identities, but, instead of specifying them on GraphQL queries we use events.

## Watch the tutorial

> **Note**: video is coming soon!

## General rule

To make some of your model work as cache identity manager:

1. Make sure it implements the `Magento\Framework\DataObject\IdentityInterface`

    ```php
    use Magento\Framework\DataObject\IdentityInterface;
    use Magento\Framework\Model\AbstractModel;

    class Slide extends AbstractModel implements IdentityInterface {
        public function getIdentities() {
            // TODO: implement
        }
    }
    ```

2. Specify the caching tag constant, it should be short and unique:

    ```php
    class Slide extends AbstractModel implements IdentityInterface {
        const CACHE_TAG = 'sw_sld';

        protected $_cacheTag = self::CACHE_TAG;
    }
    ```

3. Implement the `getIdentities` method, specify all involved cache identities. In our example, on slide save, the slider model should also be invalidate:

    ```php
    class Slide extends AbstractModel implements IdentityInterface {
        const CACHE_TAG = 'sw_sld';

        public function getIdentities() {
            return [
                self::CACHE_TAG . '_' . $this->getId(),
                Slider::CACHE_TAG . '_' . $this->getSliderId()
            ];
        }
    }
    ```

4. Add the names for events, prefer unique, descriptive names:

    ```php
    class Slide extends AbstractModel implements IdentityInterface {
        protected $_eventPrefix = 'scandiweb_slider_slide';
    }
    ```

5. In case you have a resource model, i.e. the `Collection`, add the event after collection save:

    ```php
    use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

    class Collection extends AbstractCollection {
        protected function _afterLoadData() {
            parent::_afterLoadData();

            $collection = clone $this;

            if (count($collection)) {
                $this->_eventManager->dispatch(
                    'scandiweb_slider_slider_collection_load_after',
                    ['collection' => $collection]
                );
            }

            return $this;
        }
    }
    ```

6. It is finally time to connect the events, to granular cache management classes. Create, or modify the `etc/events.xml` with following content:

    ```xml
    <config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Event/etc/events.xsd">
        <event name="scandiweb_slider_slider_collection_load_after">
            <observer name="pq_cc_slider" instance="ScandiPWA\Cache\Observer\Response\TagEntityResponse"/>
        </event>
        <event name="scandiweb_slider_slider_save_after">
            <observer name="pq_cc_slider" instance="ScandiPWA\Cache\Observer\FlushVarnishObserver"/>
        </event>
        <event name="scandiweb_slider_slide_collection_load_after">
            <observer name="pq_cc_slide" instance="ScandiPWA\Cache\Observer\Response\TagEntityResponse"/>
        </event>
        <event name="scandiweb_slider_slide_save_after">
            <observer name="pq_cc_slide" instance="ScandiPWA\Cache\Observer\FlushVarnishObserver"/>
        </event>
    </config>
    ```

    Note, there are two classes used as observers:

    - `ScandiPWA\Cache\Observer\FlushVarnishObserver` - responsible for flushing, must be triggered on save of the model.
    - `ScandiPWA\Cache\Observer\Response\TagEntityResponse` - responsible for tagging, must be triggered after load of the collection / model.


