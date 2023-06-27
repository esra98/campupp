import {Campsite} from "@/models/Campsite";
import {mongooseConnect} from "@/lib/mongoose";



export default async function handler(req, res) {
  const {method} = req;
  await mongooseConnect();

  try {
    const { page, limit, cities, ...filterOptions } = req.query;

    const query = Campsite.find();

    // Apply city filter if cities are provided
    if (cities) {
      const citiesArray = cities.split(',');
      query.where('city').in(citiesArray);
    }

    // Apply additional filter options
    Object.entries(filterOptions).forEach(([key, value]) => {
      if (value === 'true') {
        query.where(key).equals(true);
      }
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalCount = await Campsite.countDocuments(query);

    query.skip(startIndex).limit(limit);

    const campsites = await query.exec();

    // Prepare response
    const response = {
      campsites,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching campsites:', error);
    res.status(500).json({ error: 'Server error' });
  }
}