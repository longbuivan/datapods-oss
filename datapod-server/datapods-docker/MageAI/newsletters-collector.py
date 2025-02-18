import io
import pandas as pd
import requests

def load_data(*args, **kwargs):
    url = "https://dev.to/api/articles"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()  # Returns a list of articles
    else:
        raise Exception(f"Failed to fetch data: {response.status_code}")

def transform(data, *args, **kwargs):
    """
    Template code for a transformer block.

    Add more parameters to this function if this block has multiple parent blocks.
    There should be one parameter for each output variable from each parent block.

    Args:
        data: The output from the upstream parent block
        args: The output from any additional upstream blocks (if applicable)

    Returns:
        Anything (e.g. data frame, dictionary, array, int, str, etc.)
    """
    # Specify your transformation logic here
    transformed_data = []
    for article in data:
        transformed_data.append({
            "id": article.get("id"),
            "title": article.get("title"),
            "description": article.get("description"),
            "url": article.get("url"),
            "published_at": article.get("published_at"),
            "tags": ", ".join(article.get("tag_list", [])),
        })
    return transformed_data

    return data

articles = load_data()
list_of_articles = transform(articles)

urls = [article['url'] for article in list_of_articles]
print(urls)
