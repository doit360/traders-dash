<template>
  <tile :position="position" modifiers="overflow transparent">
    <section class="tweets">
      <div class="tweet" v-for="(tweet, index) in onDisplay" :key="index">
        <div class="tweet__header">
          <div class="tweet__avatar" :style="'background-image: url('+ tweet.authorAvatar +')'"></div>
          <div class="tweet__user">
            <div class="tweet__user__name h-ellipsis" v-html="tweet.authorName"></div>
            <div class="tweet__user__handle h-ellipsis">{{ tweet.authorScreenName }}</div>
          </div>
        </div>
        <div :class="addClassModifiers('tweet__body', tweet.displayClass)" v-html="tweet.html"></div>
        <div class="tweet__meta">
          <relative-date :moment="tweet.date"></relative-date>
          <span
            v-if="tweet.hasQuote"
            class="tweet__user__handle h-ellipsis"
          >In reply to {{ tweet.quote.authorScreenName }}</span>
        </div>
        <div v-if="tweet.image" class="tweet__attachment">
          <img class="tweet__attachment__image" :src="tweet.image" />
        </div>
        <div v-if="tweet.hasQuote" class="tweet--quoted">
          <div class="tweet__body tweet__body--small" v-html="tweet.quote.html"></div>
        </div>
      </div>
    </section>
    <div class="tweets__icon h-background-icon" v-if="!onDisplay.length"></div>
  </tile>
</template>

<script>
import echo from "../mixins/echo";
import Tile from "./Tile";
import RelativeDate from "./atoms/RelativeDate";
import Tweet from "../services/twitter/Tweet";
import moment from "moment";
import { diffInSeconds, addClassModifiers } from "../helpers";

export default {
  components: {
    Tile,
    RelativeDate
  },
  mixins: [echo],
  props: ["position", "initialTweets"],
  data() {
    return {
      displayingTopTweetSince: moment(),
      tweets: [],
      waitingLine: [],
      ownScreenName: "@whale_alert"
    };
  },
  created() {
    this.tweets = this.initialTweets.map(
      tweetProperties => new Tweet(tweetProperties)
    );
    setInterval(this.processWaitingLine, 1000);
  },
  methods: {
    addClassModifiers,
    getEventHandlers() {
      return {
        "Twitter.Mentioned": response => {
          this.addToWaitingLine(new Tweet(response.tweetProperties));
        }
      };
    },
    addToWaitingLine(tweet) {
      this.waitingLine.push(tweet);
    },
    processWaitingLine() {
      if (this.waitingLine.length === 0) {
        return;
      }
      if (diffInSeconds(this.displayingTopTweetSince) < 5) {
        return;
      }
      this.tweets.unshift(this.waitingLine.shift());
      this.tweets = this.tweets.slice(0, 20);
      this.displayingTopTweetSince = moment();
    },
    getSaveStateConfig() {
      return {
        cacheKey: "twitter"
      };
    }
  },
  computed: {
    onDisplay() {
      return this.tweets.filter(tweet => {
        return (
          tweet.authorScreenName !== this.ownScreenName && !tweet.isRetweet
        );
      });
    }
  }
};
</script>

<style lang="scss">
.tweets {
    margin: calc(var(--grid-padding) * -1);
}

.tweets__icon {
    background-image: url('/images/svg/twitter.svg');
}

.tweet {
    margin-bottom: var(--grid-gap);
    padding: var(--grid-gap);
    border-radius: .25vw;
    background-color: var(--gray-darker);
}

.tweet--quoted {
    margin-top: var(--grid-gap);
    padding: var(--grid-gap) 0;
    border-top: dotted 2px rgba(255, 255, 255, .15);
}

.tweet__header {
    display: flex;
    align-items: center;
    margin-bottom: .5em;
}

.tweet__user {
    min-width: 0;
}

.tweet__user__handle {
    color: var(--gray-light);
    font-size: var(--font-size-xxs);
}

.tweet__user__name {
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xxs);
    filter: grayscale(1);
}

.tweet__avatar {
    display: block;
    flex-grow: 0;
    flex-shrink: 0;
    overflow: hidden;
    margin-right: .5vw;
    width: 2.5vw;
    height: 2.5vw;
    border-radius: 1.25vw;
    background-color: white;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 0 1px 10px rgba(0, 0, 0, .25);
}

.tweet__body--default {
    font-size: var(--font-size-s);
}

.tweet__body--small {
    font-size: var(--font-size-xxs);
}

.tweet__body--medium {
    font-size: var(--font-size);
}

.tweet__body--large {
    font-size: var(--font-size-m);
}

.tweet__body__handle {
    font-weight: var(--font-weight-black);
}

.tweet__body__hashtag {
    color: var(--gray-light);
}

.tweet__attachment {
    overflow: hidden;
    margin-top: var(--grid-gap);
    text-align: center;
    opacity: .75;
}

.tweet__attachment__image {
    max-width: 100%;
    max-height: 15vh;
    border-radius: .25vw;
    box-shadow: 0 1px 10px rgba(0, 0, 0, .25);
    vertical-align: middle;
}

.tweet__meta {
    margin-top: .5vw;
    color: var(--gray-light);
    font-size: var(--font-size-xxs);
}
</style>