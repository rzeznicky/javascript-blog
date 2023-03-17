'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
};
// const optArticleSelector = '.post';
// const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.list.tags';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
const optAuthorsListSelector = '.list.authors';

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title'
};

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  // console.log(event);
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = ''){
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* [DONE] for each article */
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);
  let html = '';
  for(let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    /* [DONE] find the title element */
    const articleTitleElement = article.querySelector(opts.titleSelector);
    /* [DONE] get the title from the title element */
    const articleTitle = articleTitleElement.innerHTML;
    /* [DONE] create HTML of the link */
    // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* [NEW] also create HTML of the link in different way with Handlebars */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    /* [DONE] insert link into titleList */
    // another way to insert instead of: 'html = html + linkHTML' below:
    // titleList.insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(tags){
  /* Define object params with two parameters: min and max */
  let params = {
    max: 0,
    min: 999999
  };
  /* START LOOP for each tag in object */
  for(let tag in tags){
    // console.log(tag + ' is used ' + tags[tag] + ' times');
    /* Compare amount of each tag appearance with max parameter and save highest value */
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    /* Same with min parameter */
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
    /* END LOOP for each tag */
  }
  return params;
}

function calculateTagsClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [DONE] create a new variable allTags with an empty object */
  let allTags = {};
  // console.log(allTags);
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* [DONE] generate HTML of the link */
      // const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      /* Handlebars method to generate HTML of the link */
      const linkHTMLData = {tagName: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      /* [DONE] add generated code to html variable */
      html = html + linkHTML + ' ';
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag]=1;
      }
      /* [DONE] increment number of allTags */
      else {
        allTags[tag]++;
      }
    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
  /* [DONE] END LOOP: for every article: */
  }
  /* [DONE] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /*  Add tagsParams variable */
  const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsParams: ', tagsParams);
  /* [DONE] create variable for all links HTML code */
  let allTagsHTML = '';
  /* [DONE] START LOOP: for each tag in allTags */
  for(let tag in allTags){
    /* [DONE] generate code of a link and add it to allTagsHTML */
    // allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
    allTagsHTML += `<li><a href="#tag-${tag}" class="${calculateTagsClass(allTags[tag], tagsParams)}"> ${tag} </a></li>`;
  /* [NEW] END LOOP: for each tag in allTags */
  }
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}
generateTags();

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!');
  // console.log(event);
  console.log('clicked: ', clickedElement);
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href: ' + href);
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag after replace(): ' + tag);
  /* [DONE] find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeTagLinks: ', activeTagLinks);
  /* [DONE] START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks) {
    /* [DONE] remove class active */
    activeTagLink.classList.remove('active');
  /* [DONE] END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const targetLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('targetLinks: ', targetLinks);
  /* [DONE] START LOOP: for each found tag link */
  for (let link of targetLinks) {
    /* [DONE] add class active */
    link.classList.add('active');
  /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* [DONE] START LOOP: for each link */
  for(let link of tagLinks){
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* [DONE] END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    /* [DONE] generate HTML of the link */
    // const linkHTML =`<li><a href="#author-${articleAuthor}">${articleAuthor.toUpperCase()}</a></li>`;
    const linkHTMLData = {authorName: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);
    /* [DONE] add generated code to html variable */
    html = html + linkHTML;
    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      /* [NEW] add generated code to allAuthors object */
      allAuthors[articleAuthor]=1;
    }
    /* [NEW] increment number of allAuthors */
    else {
      allAuthors[articleAuthor]++;
    }
    /* [DONE] insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = html;
  /* [DONE] END LOOP: for every article: */
  }
  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector(optAuthorsListSelector);
  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';
  /* [NEW] START LOOP: for each author in allAuthors */
  for(let author in allAuthors){
    /* [DONE] generate code of a link and add it to allAuthorsHTML */
    allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
  /* [NEW] END LOOP: for each tag in allTags */
  }
  /* [NEW] add html from allTagsHTML to tagList */
  authorsList.innerHTML = allAuthorsHTML;
}
generateAuthors();

function authorClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Author was clicked!');
  console.log('clicked: ', clickedElement);
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href: ' + href);
  /* [DONE] make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('author: ' + author);
  /* [DONE] find all author links with "href" attribute equal to the "href" constant */
  const targetLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('targetLinks: ', targetLinks);
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* [DONE] find all links to authors */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  /* [DONE] START LOOP: for each link */
  for(let link of authorLinks){
    /* [DONE] add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  /* [DONE] END LOOP: for each link */
  }
}
addClickListenersToAuthors();
