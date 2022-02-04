require('dotenv').config();
const {
  DATABASE_URL,
  DATABASE_SECRET
} = process.env;

// Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, DATABASE_SECRET);

// Our standard serverless handler function
exports.handler = async event => {
  const { data, error } = await supabase
    .from('posts')
    .select('*');

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
