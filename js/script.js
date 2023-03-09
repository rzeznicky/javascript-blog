'use strict';

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
  // console.log('articleSelector: ', articleSelector);
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  // console.log(targetArticle);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.list.tags';

function generateTitleLinks(customSelector = ''){
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  // console.log('Deleted list: ', titleList);
  titleList.innerHTML = '';
  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    // console.log('articleId: ', articleId);
    /* [DONE] find the title element */
    const articleTitleElement = article.querySelector(optTitleSelector);
    // console.log('articleTitleElement: ', articleTitleElement);
    /* [DONE] get the title from the title element */
    const articleTitle = articleTitleElement.innerHTML;
    // console.log('articleTitle: ', articleTitle);
    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // console.log('linkHTML: ', linkHTML);
    /* [DONE] insert link into titleList */
    // another way to insert instead of: 'html = html + linkHTML' below:
    // titleList.insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;
    // console.log('html: ', html);
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  // console.log('links: ', links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];
  // console.log(allTags);
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log('ARTICLES: ', articles);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    // console.log('tagWrapper: ', tagWrapper);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log('articleTags: ', articleTags);
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log('articleTagsArray: ', articleTagsArray);
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      // console.log('linkHTML: ', linkHTML);
      /* [DONE] add generated code to html variable */
      html = html + linkHTML + ' ';
      // console.log('linkHTML: v2: ', linkHTML);
      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
      }
    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    // console.log('tagWrapper: ', tagWrapper);
  /* [DONE] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  console.log('tagList: ', tagList);
  console.log('allTags: ', allTags);
  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
  console.log('tagList updated: ', tagList);
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
  const tagLinks = document.querySelectorAll('.post-tags .list a');
  // console.log('tagLinks: ', tagLinks);
  /* [DONE] START LOOP: for each link */
  for(let link of tagLinks){
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* [DONE] END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log('ARTICLES: ', articles);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    // console.log('authorWrapper: ', authorWrapper);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    // console.log('articleAuthor: ', articleAuthor);
    /* [DONE] generate HTML of the link */
    const linkHTML ='by <a href="#' + articleAuthor + '">' + articleAuthor.toUpperCase();
    // console.log('linkHTML: ', linkHTML);
    /* [DONE] add generated code to html variable */
    html = html + linkHTML + ' ';
    /* [DONE] insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = html;
  /* [DONE] END LOOP: for every article: */
  }
}
generateAuthors();

function authorClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Author was clicked!');
  // console.log(event);
  console.log('clicked: ', clickedElement);
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href: ' + href);
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#', '');
  console.log('tag: ' + tag);
  /* [DONE] find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('.post-author a.active');
  console.log('activeAuthorLinks: ', activeAuthorLinks);
  /* [DONE] START LOOP: for each active tag link */
  for(let link of activeAuthorLinks) {
    /* [DONE] remove class active */
    link.classList.remove('active');
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
  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors(){
  /* [DONE] find all links to authors */
  const authorLinks = document.querySelectorAll('.post-author a');
  // console.log('authorLinks: ', authorLinks);
  /* [DONE] START LOOP: for each link */
  for(let link of authorLinks){
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  /* [DONE] END LOOP: for each link */
  }
}
addClickListenersToAuthors();
