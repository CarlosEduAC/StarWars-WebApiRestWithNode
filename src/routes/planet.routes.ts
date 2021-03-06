import { Router } from 'express';
import { getMongoRepository } from "typeorm";

import CreatePlanetService from '../services/CreatePlanetService';
import DeletePlanetService from '../services/DeletePlanetService';
import UpdatePlanetService from '../services/UpdatePlanetService';

import Planet from '../models/Planet';

const PlanetRouter = Router();

PlanetRouter.get('/', async(request, response) => {
  const planetRepository = getMongoRepository(Planet);

  const planets = await planetRepository.find();

  return response.json({ planets });
});

PlanetRouter.get('/:id', async(request, response) => {
  const { id } = request.params;

  const planetRepository = getMongoRepository(Planet);

  const planet = await planetRepository.findOne(id);

  return response.json(planet);
});

PlanetRouter.get('/name/:name', async(request, response) => {
  const name = request.params;

  const planetRepository = getMongoRepository(Planet);

  const planet = await planetRepository.findOne(name);

  return response.json(planet);
});

PlanetRouter.post('/', async(request, response) => {
  const { name, climate, terrain } = request.body;

  const createPlanet = new CreatePlanetService();

  const planet = await createPlanet.execute({
    name,
    climate,
    terrain,
  });

  return response.status(201).json(planet);
});

PlanetRouter.put('/:id', async(request, response) => {
  const { id, name, climate, numberOfFilms, terrain } = request.body;

  const updatePlanet = new UpdatePlanetService();

  const planet = await updatePlanet.execute({
    id,
    name,
    climate,
    numberOfFilms,
    terrain
  });

  return response.status(200).send(planet);
});

PlanetRouter.delete('/:id', async(request, response) => {
  const { id } = request.params;

  const deletePlanet = new DeletePlanetService();

  await deletePlanet.execute({ id });

  return response.status(204).send();
});

export default PlanetRouter;
