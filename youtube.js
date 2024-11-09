import { fox } from 'fetchfox';

const examplePokemon = async () => {
  const out = await fox
    .config({
    })
    .init('https://pokemondb.net/pokedex/national')
    .extract({ questions: { name: 'Pokemon name', number: 'Pokemon number' }})
    .limit(3)
    .run(null, (delta) => {
      console.log('Item:', delta.item);
    });

  console.log('Items:');
  console.log(JSON.stringify(out.items, null, 2));
}

const exampleYoutubeComments = async () => {
  const url = 'https://www.youtube.com/watch?v=u6aEYuemt0M';

  let count = 0;

  const out = await fox
    .config({
      actor: [
        'playwright',
        { headless: true, timeoutWait: 10000, loadWait: 2000 }],
      fetcher: ['actor'],
      diskCache: '/tmp/fetchfox-test-cache',
    })
    .init(url)
    .fetch({ scroll: 5, scrollWait: 500 })
    .extract({
      username: 'comment poster username',
      commentText: 'text of the comment',
      upvotes: 'number of upvotes for the comment',
    })
    .unique('commentText')
    .limit(50)
    .run(
      null,
      (partial) => {
        count++;
        console.log(`Item ${count}:`, partial.item);
      });

  console.log('Running scraper...');

  console.log('Items:');
  console.log(JSON.stringify(out.items, null, 2));
}

// await examplePokemon();
await exampleYoutubeComments();
