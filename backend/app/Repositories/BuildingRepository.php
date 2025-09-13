<?php

namespace App\Repositories;

use App\Models\Building;

class BuildingRepository extends BaseRepository {
    public function getModel()
    {
        return Building::class;
    }

    public function getFilter(array $data = [])
    {
        $query = Building::query();
        $query->with(['units']);

        if (!empty($data['status'])) {
            $query->where('status', $data['status']);
        }

        if (!empty($data['owner_user_id'])) {
            $query->where('owner_user_id', $data['owner_user_id']);
        }

        return $query->orderBy('id', 'desc')->paginate($data['size'] ?? 10);
    }
}
