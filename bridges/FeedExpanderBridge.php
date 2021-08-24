<?php
class FeedExpanderBridge extends FeedExpander {
    const NAME        = 'FeedExpander Bridge';
    const URI         = '';
    const DESCRIPTION = 'Simple bridge for using existing rss feeds';
    const PARAMETERS  = array(
        array(
            'feeduri' => array(
                'name' => 'Feed URI',
                'type' => 'text',
                'required' => true,
                'title' => 'URI to get feed from'
            )
        )
    );

    public function collectData() {
        $this->collectExpandableDatas($this->getInput('feeduri'));
    }
}
//empty