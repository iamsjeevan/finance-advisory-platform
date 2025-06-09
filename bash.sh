#!/bin/bash

# The name of the output file
OUTPUT_FILE="all_news_code.txt"

# An array of all the files and directories related to the News feature.
# This makes it easy to add or remove files in the future.
TARGETS=(
  "src/pages/News.tsx"
  "src/components/news" # This will include the entire news directory
  "src/components/NewsCard.tsx"
  "src/context/NewsContext.tsx"
  "src/context/WatchlistContext.tsx"
  "src/hooks/useFetchNews.ts"
  "src/types/news.ts"
  "src/utils/newsAPI.ts"
  "src/utils/newsUtils.tsx"
  "src/utils/alphaVantageAPI.ts" # Often used for stock news/data
)

# Ensure the output file is empty before we start
> "$OUTPUT_FILE"

echo "🚀 Starting to gather News feature code..."
echo "------------------------------------------"

# Use 'find' to locate all files within the specified targets
# The -print0 and 'while read' loop handles filenames with spaces correctly.
find "${TARGETS[@]}" -type f -print0 | while IFS= read -r -d $'\0' file; do
  if [ -f "$file" ]; then
    echo "✅ Adding: $file"
    
    # Append a header with the file path to the output file
    echo "====================================================================" >> "$OUTPUT_FILE"
    echo "📁 FILE: $file" >> "$OUTPUT_FILE"
    echo "====================================================================" >> "$OUTPUT_FILE"
    
    # Append the content of the file
    cat "$file" >> "$OUTPUT_FILE"
    
    # Add a couple of newlines for better separation between files
    echo -e "\n\n" >> "$OUTPUT_FILE"
  fi
done

echo "------------------------------------------"
echo "🎉 Success! All news-related code has been compiled into: $OUTPUT_FILE"
echo "You can now copy its content to get feedback."